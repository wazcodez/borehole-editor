import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Pumping Test",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="waterpump" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Pumping Test",
    level: Terms.Block.Level.Sample,
    flowrate: "",
    flowrate_unit: "L/s",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Pumping Test</div>
        </div>
        <div>
          <SmartTag
            value={data.flowrate}
            placeholder={"Flowrate"}
            heading={`Q: ${data.flowrate} ${data.flowrate_unit}`}
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
            heading={"Pump Rate"}
            data={{ ...data }}
            value={data.flowrate}
            onUpdate={onUpdate}
            valueKey="flowrate"
            unitKey="flowrate_unit"
            defaultOption={data.flowrate_unit}
            _options={[
              { value: "L/s", title: "L/s" },
              { value: "L/min", title: "L/min" },
              { value: "L/hr", title: "L/hr" },
              { value: "m^3/s", title: "m^3/s" },
              { value: "m^3/min", title: "m^3/min" },
              { value: "m^3/hour", title: "m^3/hour" },
              { value: "cm^3/s", title: "cm^3/s" },
              { value: "cm^3/min", title: "cm^3/min" },
              { value: "cm^3/hour", title: "cm^3/hour" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
