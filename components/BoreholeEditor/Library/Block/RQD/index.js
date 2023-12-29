import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "RQD",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="rockwithcracks" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "RQD",
    level: Terms.Block.Level.Sample,
    rqd: "",
    rqd_unit: "%",
    legnth_of_piecies: "",
    legnth_of_piecies_unit: "m",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">RQD</div>
        </div>
        <div>
          <SmartTag
            value={data.rqd}
            placeholder={"RQD"}
            heading={`RQD: ${data.rqd}${data.rqd_unit} L: ${
              data.legnth_of_piecies || "N/A"
            } ${data.legnth_of_piecies_unit}`}
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
            heading={"RQD"}
            data={{ ...data }}
            value={data.rqd}
            onUpdate={onUpdate}
            valueKey="rqd"
            unitKey="rqd_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Length of Piecies Summed"}
            data={{ ...data }}
            value={data.legnth_of_piecies}
            onUpdate={onUpdate}
            valueKey="legnth_of_piecies"
            unitKey="legnth_of_piecies_unit"
            defaultOption={"m"}
            _options={[
              { value: "m", title: "m" },
              { value: "cm", title: "cm" },
              { value: "mm", title: "mm" },
              { value: "ft", title: "ft" },
              { value: "in", title: "in" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
