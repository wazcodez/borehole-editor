import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Bulk Unit Weight",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="weight" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Bulk Unit Weight",
    level: Terms.Block.Level.Sample,
    unit_weight: "",
    unit_weight_unit: "kN/m^3",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Bulk Unit Weight</div>
        </div>
        <div>
          <SmartTag
            value={data.unit_weight}
            placeholder={"Bulk Unit Weight"}
            heading={`Bulk Unit Weight: ${data.unit_weight} ${data.unit_weight_unit}`}
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
            heading={"Bulk Unit Weight"}
            data={{ ...data }}
            value={data.unit_weight}
            onUpdate={onUpdate}
            valueKey="unit_weight"
            unitKey="unit_weight_unit"
            defaultOption={data.unit_weight_unit}
            _options={[{ value: "kN/m^3", title: "kN/m^3" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
