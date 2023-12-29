import BlockRowEdit from "./../BlockRowEdit";
import InputNumber from "./../../../../common/InputNumber";
import Label from "./../../../../common/Label";
import DepthInput from "./../../../../common/DataEntry/DepthInput/v2";
import { Select } from "antd";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";

const { Option } = Select;

const LithologyEditor = ({ data, onUpdate, idx }) => {
  const { description, title, start_depth, end_depth, depth_unit } = data;
  return (
    <div className="flex flex-col mt-0 justify-start w-full max-w-lg">
      <BlockRowEdit title={"Details"}>
        <div className="pl-1">
          <Label title={"Title"} />
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
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
          <Label title={"Description"} />
          <textarea
            placeholder={"Description"}
            value={description}
            onChange={(e) => {
              onUpdate({ ...data, description: e.target.value });
            }}
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          ></textarea>
          <DepthInput
            start_depth={start_depth}
            end_depth={end_depth}
            depth_unit={depth_unit}
            onUpdate={onUpdate}
            data={{ ...data }}
            unit_options={[
              { title: "m", value: "m" },
              { title: "ft", value: "ft" },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Material Type"}
            value={data.material_type}
            onUpdate={onUpdate}
            valueKey={"material_type"}
            _options={[
              { value: "Rock", title: "Rock" },
              { value: "Soil", title: "Soil" },
              { value: "Fill", title: "Fill" },
              { value: "Asphalt", title: "Asphalt" },
              { value: "Concrete", title: "Concrete" },
              { value: "Organics", title: "Organics" },
              { value: "Topsoil", title: "Topsoil" },
              { value: "Other", title: "Other" },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"USCS Classificarion:"}
            value={data.uscs_classification}
            onUpdate={onUpdate}
            valueKey={"uscs_classification"}
            _options={[
              {
                value: "(GW) Well-graded gravel",
                title: "(GW) Well-graded gravel",
              },
              {
                value: "(GP) Poorly graded gravel",
                title: "(GP) Poorly graded gravel",
              },
              { value: "(GM) Silty Gravel", title: "(GM) Silty Gravel" },
              { value: "(GC) Clayey gravel", title: "(GC) Clayey gravel" },
              {
                value: "(SW) Well-graded sand",
                title: "(SW) Well-graded sand",
              },
              {
                value: "(SP) Poorly graded sand",
                title: "(SP) Poorly graded sand",
              },
              { value: "(SM) Silty sand", title: "(SM) Silty sand" },
              { value: "(SC) Clayey sand", title: "(SC) Clayey sand" },
              { value: "(CL) Lean clay", title: "(CL) Lean clay" },
              { value: "(ML) Silt", title: "(ML) Silt" },
              { value: "(OL) Organic clay", title: "(OL) Organic clay" },
              { value: "(OL) Organic silt", title: "(OL) Organic silt" },
              { value: "(CH) Fat clay", title: "(CH) Fat clay" },
              { value: "(MH) Elastic silt", title: "(MH) Elastic silt" },
              { value: "(OH) Organic clay", title: "(OH) Organic clay" },
              { value: "(OH) Organic silt", title: "(OH) Organic silt" },
              { value: "(PT) Peat", title: "(PT) Peat" },
              { value: "None", title: "None" },
            ]}
          />
        </div>
      </BlockRowEdit>
    </div>
  );
};
export default LithologyEditor;
