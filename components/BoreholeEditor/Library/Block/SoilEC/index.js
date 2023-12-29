import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

export default {
  type: Terms.Block.Type.soilEC,
  level: Terms.Block.Level.Sample,
  icon: <Icon name="measurement" />,
  multipleAllowed: false,
  schema: {
    type: Terms.Block.Type.soilEC,
    level: Terms.Block.Level.Sample,
    conductivity: "",
    conductivity_unit: "miliSiemens/cm",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Soil Electrical Conductivity</div>
        </div>
        <div>
          <SmartTag
            value={data.conductivity}
            placeholder={"Conductivity"}
            heading={`${data.conductivity} ${data.conductivity_unit}`}
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
            heading={"Conductivity"}
            data={data}
            value={data.conductivity}
            onUpdate={onUpdate}
            valueKey="conductivity"
            _min={0}
            unitKey="conductivity_unit"
            defaultOption={data.conductivity_unit}
            _options={[
              { value: "miliSiemens/cm", title: "miliSiemens/cm" },
              { value: "microSiemens/cm", title: "microSiemens/cm" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
