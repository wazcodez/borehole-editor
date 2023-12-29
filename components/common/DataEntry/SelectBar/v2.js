import Label from "./../../Label";
import { Button, MenuItem } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";

const filterPredicate = (query, item) => {
  return item.title.toLowerCase().indexOf(query.toLowerCase()) >= 0;
};

const renderItem = (item, { handleClick, modifiers }) => {
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

const SelectBar = ({ heading, data, onUpdate, value, _options, valueKey }) => {
  return (
    <div>
      <Label title={heading} />

      <Select
        items={_options}
        itemPredicate={filterPredicate}
        itemRenderer={renderItem}
        resetOnQuery={false}
        activeItem={_options.filter((j) => j.value === value)[0]}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={(item) => {
          onUpdate({
            ...data,
            [valueKey]: item.value,
          });
        }}
      >
        {/* children become the popover target; render value here */}
        <Button
          text={value === "" ? "Select ... " : value}
          rightIcon="double-caret-vertical"
        />
      </Select>

      {/* <Select
        showSearch
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        defaultValue={value}
        value={value}
        style={{ width: "100%" }}
        size={"large"}
        onChange={(val) => {
          onUpdate({
            ...data,
            [valueKey]: val,
          });
        }}
      >
        {_options.map((item, i) => {
          return (
            <Option
              key={item.value}
              value={item.value}
            >{`${item.title}`}</Option>
          );
        })}
      </Select> */}
    </div>
  );
};

export default SelectBar;
