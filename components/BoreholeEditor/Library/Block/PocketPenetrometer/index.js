import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Pocket Penetrometer",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="mechanicalpencil" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Pocket Penetrometer",
    level: Terms.Block.Level.Sample,
    unconfined_compressive_strength: "",
    unconfined_compressive_strength_unit: "kg/cm^2",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Pocket Penetrometer</div>
        </div>
        <div>
          <SmartTag
            value={data.unconfined_compressive_strength}
            placeholder={"Unconfined Compressive Strength"}
            heading={`${data.unconfined_compressive_strength} ${data.unconfined_compressive_strength_unit}`}
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
            heading={"Unconfined Compressive Strength"}
            data={{ ...data }}
            value={data.unconfined_compressive_strength}
            onUpdate={onUpdate}
            valueKey="unconfined_compressive_strength"
            unitKey="unconfined_compressive_strength_unit"
            defaultOption={data.unconfined_compressive_strength_unit}
            _options={[
              { value: "kg/cm^2", title: "kg/cm^2" },
              { value: "tons/ft^2", title: "tons/ft^2" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
