import Label from "./../../Label";
import { Button, MenuItem } from "@blueprintjs/core";
import { Input } from "antd";
import { Select } from "@blueprintjs/select";

const isEmptyOrNull = (candidate) => {
  if (candidate === null || candidate === undefined) {
    return true;
  }
  return false;
};

const isNumber = (candidate) => {
  const val = parseFloat(candidate);
  if (val !== undefined && val !== null && !isNaN(val)) {
    return true;
  }
  return false;
};

const canUpdate = (min, max, candidate) => {
  if (isEmptyOrNull(candidate)) {
    return false;
  }
  if (isNumber(candidate) === false) {
    return false;
  }
  if (countCharacters(".", candidate) > 1) {
    return false;
  }

  const num = parseFloat(candidate);

  if (isEmptyOrNull(max) === false) {
    if (num > max) {
      return false;
    }
  }
  if (isEmptyOrNull(min) === false) {
    if (num < min) {
      return false;
    }
  }

  return true;
};

function countCharacters(char, string) {
  return string.split("").reduce((acc, ch) => (ch === char ? acc + 1 : acc), 0);
}

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

const DepthInput = ({
  start_depth,
  end_depth,
  onUpdate,
  unit_options,
  _min,
  _max,
  data,
  start_placeholder = "Start depth",
  end_placeholder = "End depth",
  depth_unit,
}) => {
  return (
    <div>
      <Label title={"Depth"} />
      <Input.Group compact>
        <Input
          style={{ width: 100, textAlign: "center" }}
          placeholder={start_placeholder}
          min={_min}
          value={start_depth}
          defaultValue={start_depth}
          onChange={(val) => {
            if (!isNumber(val.target.value)) {
              onUpdate({
                ...data,
                start_depth: "",
              });
              return;
            }
            if (canUpdate(_min, _max, val.target.value)) {
              onUpdate({
                ...data,
                start_depth: val.target.value.replace(/[^\d.-]/g, ""),
              });
            }
          }}
        />
        <Input
          className="site-input-split"
          style={{
            width: 36,
            borderLeft: 0,
            borderRight: 0,
            pointerEvents: "none",
          }}
          placeholder="to"
          disabled
        />
        <Input
          className="site-input-right"
          style={{
            width: 100,
            textAlign: "center",
          }}
          min={_min}
          value={end_depth}
          defaultValue={end_depth}
          onChange={(val) => {
            if (!isNumber(val.target.value)) {
              onUpdate({
                ...data,
                end_depth: "",
              });
              return;
            }
            if (canUpdate(_min, _max, val.target.value)) {
              onUpdate({
                ...data,
                end_depth: val.target.value.replace(/[^\d.-]/g, ""),
              });
            }
          }}
          placeholder={end_placeholder}
        />
        <Select
          items={unit_options}
          itemPredicate={filterPredicate}
          itemRenderer={renderItem}
          resetOnQuery={false}
          activeItem={unit_options.filter((j) => j.value === depth_unit)[0]}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={(item) => {
            onUpdate({
              ...data,
              depth_unit: item.value,
            });
          }}
        >
          <Button
            text={depth_unit === "" ? "Select .. " : depth_unit}
            rightIcon="double-caret-vertical"
          />
        </Select>

        {/* <Select
          defaultValue={depth_unit}
          onChange={(val) => {
            onUpdate({
              ...data,
              depth_unit: val,
            });
          }}
        >
          {unit_options.map((item, i) => {
            return (
              <Option key={i} value={`${item.value}`}>{`${item.title}`}</Option>
            );
          })}
        </Select> */}
      </Input.Group>
      {/* <div className="flex flex-row flex-wrap w-full align-middle items-center">
        <InputNumber
          size={"large"}
          value={start_depth}
          defaultValue={start_depth}
          min={-100}
          onChange={(val) => {
            onUpdate({
              ...data,
              start_depth: val,
            });
          }}
        />
        <div className="px-2">to</div>
        <InputNumber
          size={"large"}
          value={end_depth}
          defaultValue={end_depth}
          onChange={(val) => {
            onUpdate({
              ...data,
              end_depth: val,
            });
          }}
        />
        <div className="px-1">
          <Select
            defaultValue={depth_unit}
            size={"large"}
            style={{ width: 65 }}
            bordered={false}
            onChange={(val) => {
              onUpdate({
                ...data,
                depth_unit: val,
              });
            }}
          >
            {unit_options.map((item) => {
              return <Option value={`${item.value}`}>{`${item.title}`}</Option>;
            })}
          </Select>
        </div>
      </div> */}
    </div>
  );
};

export default DepthInput;
