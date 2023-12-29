import React, { Component } from "react";
import { Intent, Button } from "@blueprintjs/core";
import {
  Column,
  ColumnHeaderCell,
  EditableCell,
  EditableName,
  Table,
} from "@blueprintjs/table";
import { Select } from "@blueprintjs/select";
import { MenuItem } from "@blueprintjs/core";
import { data } from "autoprefixer";

const renderDropdownItem = (item, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      key={item.value}
      label={""}
      text={item.title}
      onClick={handleClick}
    />
  );
};

class TableInput extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.data.sparseCellData);
    this.state = {
      columnNames: props.cols,
      numRows: 10,
      sparseCellData: { ...this.props.data.sparseCellData },
      sparseCellIntent: {},
      sparseColumnIntents: [],
      dropdownOptions: props.dropdownOptions || {},
    };
  }

  dataKey = (rowIndex, columnIndex) => {
    return `${rowIndex}-${columnIndex}`;
  };

  render() {
    const columns = this.state.columnNames.map((name, index) => {
      return (
        <Column
          key={index}
          name={name}
          cellRenderer={this.renderCell}
          //columnHeaderCellRenderer={this.renderColumnHeader}
        />
      );
    });
    return (
      <div>
        <Table
          columnWidths={this.props.columnWidths}
          numRows={this.state.numRows}
          enableColumnResizing={false}
        >
          {columns}
        </Table>
        <div className="pt-2">
          <Button
            text="Add Row"
            style={{ float: "right" }}
            onClick={() => {
              const prevRows = this.state.numRows;
              this.setState({ numRows: prevRows + 1 });
            }}
          />
        </div>
      </div>
    );
  }

  renderCell = (rowIndex, columnIndex) => {
    const dataKey = this.dataKey(rowIndex, columnIndex);
    const value = this.state.sparseCellData[dataKey];
    const columnHeading = this.state.columnNames[columnIndex];
    if (columnHeading in this.state.dropdownOptions) {
      return (
        <div className="bp3-table-cell">
          <Select
            items={this.state.dropdownOptions[columnHeading]}
            itemRenderer={renderDropdownItem}
            resetOnQuery={false}
            activeItem={
              this.state.dropdownOptions[columnHeading].filter((j) => {
                if (!j) {
                  return false;
                }
                return j.value === value;
              })[0]
            }
            noResults={<MenuItem disabled={true} text="No results." />}
            onItemSelect={(item) =>
              this.setState({
                sparseCellData: {
                  ...this.state.sparseCellData,
                  [dataKey]: item.title,
                },
              })
            }
          >
            <span className="dropdown-cell" rightIcon="double-caret-vertical">
              {value === "" || value === undefined ? "..." : value}
            </span>
          </Select>
        </div>
      );
    }

    return (
      <EditableCell
        value={value == null ? "" : value}
        intent={this.state.sparseCellIntent[dataKey]}
        onCancel={this.cellValidator(rowIndex, columnIndex)}
        onChange={this.cellValidator(rowIndex, columnIndex)}
        onConfirm={this.cellSetter(rowIndex, columnIndex)}
      />
    );
  };

  renderColumnHeader = (columnIndex) => {
    const nameRenderer = (name) => {
      return (
        <EditableName
          name={name}
          intent={this.state.sparseColumnIntents[columnIndex]}
          onChange={this.nameValidator(columnIndex)}
          onCancel={this.nameValidator(columnIndex)}
          onConfirm={this.nameSetter(columnIndex)}
        />
      );
    };

    return (
      <ColumnHeaderCell
        name={this.state.columnNames[columnIndex]}
        nameRenderer={nameRenderer}
      />
    );
  };

  // check if number
  isValidValue = (value) => {
    if (value === "") {
      return true;
    }
    return /^-?[0-9][0-9,\.]+$/.test(value);
  };

  nameValidator = (index) => {
    return (name) => {
      const intent = this.isValidValue(name) ? null : Intent.DANGER;
      this.setArrayState("sparseColumnIntents", index, intent);
      this.setArrayState("columnNames", index, name);
    };
  };

  nameSetter = (index) => {
    return (name) => {
      this.setArrayState("columnNames", index, name);
    };
  };

  cellValidator = (rowIndex, columnIndex) => {
    const dataKey = this.dataKey(rowIndex, columnIndex);
    return (value) => {
      const intent = this.isValidValue(value) ? null : Intent.DANGER;
      this.setSparseState("sparseCellIntent", dataKey, intent);
      this.setSparseState("sparseCellData", dataKey, value);
    };
  };

  cellSetter = (rowIndex, columnIndex) => {
    const dataKey = this.dataKey(rowIndex, columnIndex);
    return (value) => {
      const intent = this.isValidValue(value) ? null : Intent.DANGER;
      this.setSparseState("sparseCellData", dataKey, value);
      this.setSparseState("sparseCellIntent", dataKey, intent);
      console.log("calling update on", this.props.data, {
        ...this.state.sparseCellData,
      });
      this.props.onUpdate({
        ...this.props.data,
        sparseCellData: { ...this.state.sparseCellData },
      });
    };
  };

  setArrayState = (key, index, value) => {
    const values = this.state[key].slice();
    values[index] = value;
    this.setState({ [key]: values });
  };

  setSparseState = (stateKey, dataKey, value) => {
    const stateData = this.state[stateKey];
    const values = { ...stateData, [dataKey]: value };
    this.setState({ [stateKey]: values });
  };
}

export default TableInput;
