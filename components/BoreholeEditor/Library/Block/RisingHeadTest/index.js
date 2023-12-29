import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Rising Head Test",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="filter" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Rising Head Test",
    level: Terms.Block.Level.Sample,
    hydraulic_conductivity: "",
    hydraulic_conductivity_unit: "m/s",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Rising Head Test</div>
        </div>
        <div>
          <SmartTag
            value={data.hydraulic_conductivity}
            placeholder={"Hydraulic Conductivity"}
            heading={`K: ${data.hydraulic_conductivity} ${data.hydraulic_conductivity_unit}`}
          />
        </div>
      </div>
    );
  },
  editor: (data, onUpdate, idx) => {
    return (
      <Edit>
        <EditBlock title={"Details"}>
          <ParamSelectableUnit
            heading={"Hydraulic Conductivity"}
            data={{ ...data }}
            value={data.hydraulic_conductivity}
            onUpdate={onUpdate}
            valueKey="hydraulic_conductivity"
            unitKey="hydraulic_conductivity_unit"
            defaultOption={data.hydraulic_conductivity_unit}
            _min={0}
            _options={[
              { value: "m/s", title: "m/s" },
              { value: "m/min", title: "m/min" },
              { value: "m/hour", title: "m/hour" },
              { value: "cm/s", title: "cm/s" },
              { value: "cm/min", title: "cm/min" },
              { value: "cm/hour", title: "cm/hour" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
