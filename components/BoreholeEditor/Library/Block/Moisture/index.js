import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "moisture",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="moisture" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "moisture",
    level: Terms.Block.Level.Sample,
    moisture: "",
    moisture_unit: "%",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Moisture</div>
        </div>
        <div>
          <SmartTag
            value={data.moisture}
            placeholder={"moisture %"}
            heading={`Moisture: ${data.moisture} %`}
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
            heading={"Moisture Content"}
            data={{ ...data }}
            value={data.moisture}
            onUpdate={onUpdate}
            _min={0}
            valueKey="moisture"
            unitKey="moisture_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
