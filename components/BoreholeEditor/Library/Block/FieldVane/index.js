import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Field Vane",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="plussign" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Field Vane",
    level: Terms.Block.Level.Sample,
    undrained_shear_strength: "",
    undrained_shear_strength_unit: "kPa",
    type_test: "",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Field Vane</div>
        </div>
        <div>
          <SmartTag
            value={data.undrained_shear_strength}
            placeholder={"Undrained Shear Strength"}
            heading={`${data.undrained_shear_strength} ${data.undrained_shear_strength_unit}`}
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
            heading={"Type"}
            value={data.type_test}
            onUpdate={onUpdate}
            valueKey={"type_test"}
            _options={[
              {
                value: "Undisturbed",
                title: "Undisturbed",
              },
              {
                value: "Remoulded",
                title: "Remoulded",
              },
            ]}
          />
          <ParamSelectableUnit
            heading={"Undrained Shear Strength"}
            data={{ ...data }}
            value={data.unconfined_compressive_strength}
            onUpdate={onUpdate}
            valueKey="undrained_shear_strength"
            unitKey="undrained_shear_strength_unit"
            defaultOption={data.undrained_shear_strength_unit}
            _options={[
              { value: "kPa", title: "kPa" },
              { value: "PSF", title: "PSF" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
