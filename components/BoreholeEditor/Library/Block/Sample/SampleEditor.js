import BlockRowEdit from "./../BlockRowEdit";
import InputNumber from "./../../../../common/InputNumber";
import Label from "./../../../../common/Label";
import { Select } from "antd";
const { Option } = Select;
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import DepthInput from "./../../../../common/DataEntry/DepthInput/v2";

const SampleEditor = ({ data, onUpdate, idx }) => {
  const { description, title, start_depth, end_depth, depth_unit } = data;
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
          <DepthInput
            start_depth={data.start_depth}
            end_depth={data.end_depth}
            depth_unit={data.depth_unit}
            onUpdate={onUpdate}
            data={{ ...data }}
            unit_options={[
              { title: "m", value: "m" },
              { title: "ft", value: "ft" },
            ]}
          />
        </div>
      </BlockRowEdit>
      <BlockRowEdit title={"Sampling"}>
        <div className="pl-1">
          <ParamSelectableUnit
            heading={"Recovery - soil"}
            data={{ ...data }}
            value={data.recovery}
            onUpdate={onUpdate}
            _min={0}
            valueKey="recovery"
            unitKey="recovery_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Total Core Recovery - rock"}
            data={{ ...data }}
            value={data.total_core_recovery}
            onUpdate={onUpdate}
            _min={0}
            valueKey="total_core_recovery"
            unitKey="tcr_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Solid Core Recovery - rock"}
            data={{ ...data }}
            value={data.solid_core_recovery}
            onUpdate={onUpdate}
            _min={0}
            valueKey="solid_core_recovery"
            unitKey="scr_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Container"}
            value={data.container}
            onUpdate={onUpdate}
            valueKey={"container"}
            _options={[
              { value: "Plastic Bag", title: "Plastic Bag" },
              { value: "Plastic Box", title: "Plastic Box" },
              { value: "Plastic Jar", title: "Plastic Jar" },
              { value: "Glass Jar", title: "Glass Jar" },
              { value: "Jar", title: "Jar" },
              { value: "Other", title: "Other" },
            ]}
          />
        </div>
      </BlockRowEdit>
    </div>
  );
};
export default SampleEditor;
