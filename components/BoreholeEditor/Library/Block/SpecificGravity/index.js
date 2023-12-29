import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

export default {
  type: "Specific Gravity",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="gravity" />,
  multipleAllowed: false,
  schema: {
    type: "Specific Gravity",
    level: Terms.Block.Level.Sample,
    specific_gravity: "",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Specific Gravity</div>
        </div>
        <div>
          <SmartTag
            value={data.specific_gravity}
            placeholder={"Specific g"}
            heading={`Sg: ${data.specific_gravity}`}
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
            heading={"Specific Gravity"}
            data={data}
            value={data.specific_gravity}
            onUpdate={onUpdate}
            valueKey="specific_gravity"
            min={0}
            max={100}
          />
        </EditBlock>
      </Edit>
    );
  },
};
