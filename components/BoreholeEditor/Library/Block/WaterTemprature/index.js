import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Water Temperature",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="thermometer" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Water Temperature",
    level: Terms.Block.Level.Sample,
    temperature: "",
    temperature_unit: "deg C",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Water Temperature</div>
        </div>
        <div>
          <SmartTag
            value={data.temperature}
            placeholder={"Water Temperature"}
            heading={`${data.temperature} ${data.temperature_unit}`}
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
            heading={"Water Temperature"}
            data={{ ...data }}
            value={data.temperature}
            onUpdate={onUpdate}
            valueKey="temperature"
            unitKey="temperature_unit"
            defaultOption={"deg C"}
            _options={[
              { value: "deg C", title: "deg C" },
              { value: "F", title: "F" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
