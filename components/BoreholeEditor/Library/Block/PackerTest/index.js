import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Packer Test",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="filter" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Packer Test",
    level: Terms.Block.Level.Sample,
    transmissivity: "",
    transmissivity_unit: "m^2/s",
    storativity: "",
    storativity_unit: "[-]",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Packer Test</div>
        </div>
        <div>
          <SmartTag
            value={data.transmissivity}
            placeholder={"Transmissivity"}
            heading={`T: ${data.transmissivity} ${data.transmissivity_unit}`}
          />
          <SmartTag
            value={data.storativity}
            placeholder={"Storativity"}
            heading={`S: ${data.storativity || "N/A"}`}
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
            heading={"Storativity"}
            data={{ ...data }}
            value={data.storativity}
            onUpdate={onUpdate}
            _min={0}
            valueKey="storativity"
            unitKey="storativity_unit"
            defaultOption={data.storativity_unit}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
          <ParamSelectableUnit
            heading={"Transmissivity"}
            data={{ ...data }}
            value={data.transmissivity}
            _min={0}
            onUpdate={onUpdate}
            valueKey="transmissivity"
            unitKey="transmissivity_unit"
            defaultOption={data.transmissivity_unit}
            _options={[
              { value: "m^2/s", title: "m^2/s" },
              { value: "m^2/min", title: "m^2/min" },
              { value: "m^2/hour", title: "m^2/hour" },
              { value: "cm^2/s", title: "cm^2/s" },
              { value: "cm^2/min", title: "cm^2/min" },
              { value: "cm^2/hour", title: "cm^2/hour" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
