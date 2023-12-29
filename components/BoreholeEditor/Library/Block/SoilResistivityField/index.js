import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

export default {
  type: "Soil Resistivity",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="resistance" />,
  multipleAllowed: false,
  schema: {
    type: "Soil Resistivity",
    level: Terms.Block.Level.Sample,
    resistivity: "",
    resistivity_unit: "ohm-m",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Resistivity</div>
        </div>
        <div>
          <SmartTag
            value={data.resistivity}
            placeholder={"Resisitivity"}
            heading={`${data.resistivity} ${data.resistivity_unit}`}
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
            heading={"Resistivity"}
            data={data}
            value={data.resistivity}
            onUpdate={onUpdate}
            valueKey="resistivity"
            _min={0}
            unitKey="resistivity_unit"
            defaultOption={data.resistivity_unit}
            _options={[
              { value: "ohm-m", title: "ohm-m" },
              { value: "ohm-cm", title: "ohm-cm" },
              { value: "ohm-ft", title: "ohm-ft" },
              { value: "ohm-in", title: "ohm-in" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
