import Label from "./../../Label";
import InputNumber from "./../../InputNumber";
import { Input, Select } from "antd";
const { Option } = Select;

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
  const _selection = (
    <Select
      disabled={
        _options.length === 1 || _options === undefined || _options === null
      }
      defaultValue={defaultOption}
      className="select-after"
      onChange={(val) => {
        onUpdate({
          ...data,
          [unitKey]: val,
        });
      }}
    >
      {_options.map((item, i) => {
        return <Option key={i} value={item.value}>{`${item.title}`}</Option>;
      })}
    </Select>
  );

  return (
    <div>
      <Label title={heading} />
      <div className="flex flex-row flex-wrap w-full align-middle items-center">
        <Input
          size={"large"}
          addonAfter={_options.length === 1 ? defaultOption : _selection}
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
