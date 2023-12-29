import BlockRowEdit from "./../BlockRowEdit";
import InputNumber from "./../../../../common/InputNumber";
import Label from "./../../../../common/Label";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";

import { Select } from "antd";
const { Option } = Select;

const SampleEditor = ({ data, onUpdate, idx }) => {
  const { description, title, depth, depth_unit } = data;
  return (
    <div className="flex flex-col mt-0 justify-start w-full max-w-lg">
      <BlockRowEdit title={"Details"}>
        <div className="pl-1">
          <Label title={"Sample #"} />
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              placeholder={`eg. Sample BH-1`}
              onChange={(e) => {
                onUpdate({
                  ...data,
                  title: e.target.value,
                });
              }}
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              type="text"
              value={title}
            />
          </div>
          <Label title={"Sample Notes"} />
          <textarea
            placeholder={"eg. Sample Notes"}
            value={description}
            onChange={(e) => {
              onUpdate({ ...data, description: e.target.value });
            }}
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          ></textarea>
          <ParamSelectableUnit
            heading={"Depth"}
            data={{ ...data }}
            value={data.depth}
            onUpdate={onUpdate}
            _min={0}
            valueKey="depth"
            unitKey="depth_unit"
            defaultOption={data.depth_unit}
            _options={[
              { title: "m", value: "m" },
              { title: "ft", value: "ft" },
            ]}
          />
        </div>
      </BlockRowEdit>
    </div>
  );
};
export default SampleEditor;
