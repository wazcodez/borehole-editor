import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "UCS",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="cylinder" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "UCS",
    level: Terms.Block.Level.Sample,
    peak_unconfined_compressive_strength: "",
    peak_unconfined_compressive_strength_unit: "kPa",
    failure_strain: "",
    failure_strain_unit: "%",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">UCS</div>
        </div>
        <div>
          <SmartTag
            value={data.peak_unconfined_compressive_strength}
            placeholder={"Peak Unconfined Compressive Strength"}
            heading={`${data.peak_unconfined_compressive_strength} ${data.peak_unconfined_compressive_strength_unit}`}
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
            heading={"Peak Unconfined Compressive Strength"}
            data={{ ...data }}
            value={data.peak_unconfined_compressive_strength}
            onUpdate={onUpdate}
            valueKey="peak_unconfined_compressive_strength"
            unitKey="peak_unconfined_compressive_strength_unit"
            defaultOption={data.peak_unconfined_compressive_strength_unit}
            _options={[
              { value: "kPa", title: "kPa" },
              { value: "MPa", title: "MPa" },
              { value: "psi", title: "psi" },
            ]}
          />
          <ParamSelectableUnit
            heading={"Failure Strain"}
            data={{ ...data }}
            value={data.failure_strain}
            onUpdate={onUpdate}
            valueKey="failure_strain"
            unitKey="failure_strain_unit"
            defaultOption={data.failure_strain_unit}
            _options={[{ value: "%", title: "%" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
