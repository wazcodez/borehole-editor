import Label from "./../../Label";
import InputNumber from "./../../InputNumber";
import { Button, MenuItem } from "@blueprintjs/core";
import { Input } from "antd";
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

const ParamSelectableUnit = ({
  data,
  onUpdate,
  heading,
  value,
  defaultOption,
  _options,
  unitKey,
  valueKey,
  _min,
  _max,
  formatter,
  parser,
}) => {
  let optionItem = defaultOption;
  console.log(
    "default item",
    _options.filter((j) => j.value === optionItem)[0]
  );
  const _selection = (
    <div></div>

    // <Select
    //   disabled={
    //     _options.length === 1 || _options === undefined || _options === null
    //   }
    //   defaultValue={defaultOption}
    //   className="select-after"
    //   onChange={(val) => {
    //     onUpdate({
    //       ...data,
    //       [unitKey]: val,
    //     });
    //   }}
    // >
    //   {_options.map((item, i) => {
    //     return <Option key={i} value={item.value}>{`${item.title}`}</Option>;
    //   })}
    // </Select>
  );

  return (
    <div>
      <Label title={heading} />
      <div className="flex flex-row flex-wrap w-full align-middle items-center">
        <Input
          addonAfter={
            <Select
              items={_options}
              itemPredicate={filterPredicate}
              itemRenderer={renderItem}
              resetOnQuery={false}
              //disabled={_options.length === 1}
              activeItem={_options.filter((j) => j.value === optionItem)[0]}
              noResults={<MenuItem disabled={true} text="No results." />}
              onItemSelect={(item) => {
                optionItem = item.value;
                onUpdate({
                  ...data,
                  [unitKey]: item.value,
                });
              }}
            >
              <Button
                // disabled={_options.length === 1}
                text={optionItem === "" ? "Select .. " : optionItem}
                rightIcon="double-caret-vertical"
              />
            </Select>
          }
          type="number"
          value={value}
          min={_min}
          max={_max}
          defaultValue={value}
          // formatter={formatter} // (value) => `${value}${fixedUnit}`}
          // parser={parser} //(value) => value.replace(`${fixedUnit}`, "")}
          onChange={(e) => {
            const val = e.target.value;
            if (!isNumber(val)) {
              onUpdate({
                ...data,
                [valueKey]: "",
              });
              return;
            }

            const parsedVal = parseFloat(val);
            if (!isEmptyOrNull(_min) && !isEmptyOrNull(_max)) {
              if (_min <= parsedVal && parsedVal <= _max) {
                onUpdate({
                  ...data,
                  [valueKey]: parsedVal,
                });
              }
            } else if (isEmptyOrNull(_min) && !isEmptyOrNull(_max)) {
              if (parsedVal <= _max) {
                onUpdate({
                  ...data,
                  [valueKey]: parsedVal,
                });
              }
            } else if (!isEmptyOrNull(_min) && isEmptyOrNull(_max)) {
              if (_min <= parsedVal) {
                onUpdate({
                  ...data,
                  [valueKey]: parsedVal,
                });
              }
            } else {
              onUpdate({
                ...data,
                [valueKey]: parsedVal,
              });
            }
          }}
        />
      </div>
    </div>
  );
};

export default ParamSelectableUnit;
