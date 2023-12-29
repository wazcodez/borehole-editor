import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: Terms.Block.Type.waterPh,
  level: Terms.Block.Level.Sample,
  icon: <Icon name="phwater" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: Terms.Block.Type.waterPh,
    level: Terms.Block.Level.Sample,
    pH: "2",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Water pH</div>
        </div>
        <div>
          <SmartTag
            value={data.pH}
            placeholder={"Water pH "}
            heading={`pH: ${data.pH}`}
          />
        </div>
      </div>
    );
  },
  editor: (data, onUpdate, idx) => {
    return (
      <Edit>
        <EditBlock title={"Details"}>
          <ParamFixedUnitInput
            heading={"Water PH"}
            data={data}
            value={data.pH}
            onUpdate={onUpdate}
            valueKey="pH"
            min={0}
            max={14}
          />
        </EditBlock>
      </Edit>
    );
  },
};
