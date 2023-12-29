import Label from "./../../Label";
import { Select } from "antd";
const { Option } = Select;

const SelectBar = ({ heading, data, onUpdate, value, _options, valueKey }) => {
  return (
    <div>
      <Label title={heading} />
      <Select
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
      </Select>
    </div>
  );
};

export default SelectBar;
