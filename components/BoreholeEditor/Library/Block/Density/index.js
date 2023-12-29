import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Density Test",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="weight" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Density Test",
    level: Terms.Block.Level.Sample,
    density: "",
    proctor_type: "",
    density_unit: "kg/m^3",
    optimum_moisture_content: "",
    optimum_moisture_content_unit: "%",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Density Test</div>
        </div>
        <div>
          <SmartTag
            value={data.density}
            placeholder={"density"}
            heading={`Density: ${data.density} ${data.density_unit}`}
          />
          <SmartTag
            value={data.optimum_moisture_content}
            placeholder={"Optimum moisture content"}
            heading={`${data.optimum_moisture_content} ${data.optimum_moisture_content_unit}`}
          />{" "}
          <SmartTag
            value={data.proctor_type}
            placeholder={"Proctor"}
            heading={`${data.proctor_type}`}
          />
        </div>
      </div>
    );
  },
  editor: (data, onUpdate, idx) => {
    return (
      <Edit>
        <EditBlock title={"Details"}>
          <SelectBar
            data={{ ...data }}
            heading={"Proctor Test Method"}
            value={data.proctor_type}
            onUpdate={onUpdate}
            valueKey={"proctor_type"}
            _options={[
              { value: "Standard Proctor", title: "Standard Proctor" },
              { value: "Modified Proctor", title: "Modified Proctor" },
            ]}
          />

          <ParamSelectableUnit
            heading={"Optimum Moisture Content"}
            data={{ ...data }}
            value={data.optimum_moisture_content}
            onUpdate={onUpdate}
            _min={0}
            valueKey="optimum_moisture_content"
            unitKey="optimum_moisture_content_unit"
            defaultOption={data.optimum_moisture_content_unit}
            _options={[{ value: "%", title: "%" }]}
          />

          <ParamSelectableUnit
            heading={"Density"}
            data={{ ...data }}
            value={data.density}
            onUpdate={onUpdate}
            _min={0}
            valueKey="density"
            unitKey="density_unit"
            defaultOption={data.density_unit}
            _options={[
              { value: "kg/m^3", title: "kg/m^3" },
              { value: "kg/cm^3", title: "kg/cm^3" },
              { value: "lb/cm^3", title: "lb/cm^3" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
