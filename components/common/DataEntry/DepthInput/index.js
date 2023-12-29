import Label from "./../../Label";
import InputNumber from "./../../InputNumber";
import { Select } from "antd";
const { Option } = Select;

const DepthInput = ({
  start_depth,
  end_depth,
  onUpdate,
  unit_options,
  data,
  start_placeholder,
  end_placeholder,
  depth_unit,
}) => {
  return (
    <div>
      <Label title={"Depth"} />
      <div className="flex flex-row flex-wrap w-full align-middle items-center">
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
      </div>
    </div>
  );
};

export default DepthInput;
