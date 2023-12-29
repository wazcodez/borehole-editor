import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

export default {
  type: "Slake Durability",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="rockwithcracks" />,
  multipleAllowed: false,
  schema: {
    type: "Slake Durability",
    level: Terms.Block.Level.Sample,
    slake_durability_index: "",
    private_notes: "",
    unit: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Slake Durability Index</div>
        </div>
        <div>
          <SmartTag
            value={data.slake_durability_index}
            placeholder={"Slake Durability Index"}
            heading={`SDI: ${data.slake_durability_index}`}
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
            heading={"Slake Durability Index"}
            data={{ ...data }}
            value={data.slake_durability_index}
            onUpdate={onUpdate}
            _min={0}
            valueKey="slake_durability_index"
            unitKey="unit"
            defaultOption={"[-]"}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
