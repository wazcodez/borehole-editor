import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

export default {
  type: "California Bearing Ratio",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="cylinder" />,
  multipleAllowed: false,
  schema: {
    type: "California Bearing Ratio",
    level: Terms.Block.Level.Sample,
    bearing_ratio: "",
    private_notes: "",
    unit: "%",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">California Bearing Ratio</div>
        </div>
        <div>
          <SmartTag
            value={data.bearing_ratio}
            placeholder={"California Bearing Ratio"}
            heading={`CBR: ${data.bearing_ratio}`}
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
            heading={"California Bearing Ratio"}
            data={{ ...data }}
            value={data.bearing_ratio}
            onUpdate={onUpdate}
            valueKey="bearing_ratio"
            unitKey="unit"
            _min={0}
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
