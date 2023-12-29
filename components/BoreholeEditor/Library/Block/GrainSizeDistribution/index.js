import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Grain Size Distribution",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="histogram" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Grain Size Distribution",
    level: Terms.Block.Level.Sample,
    type_of_test: "",
    pct_gravel: "",
    pct_sand: "",
    pct_fines: "",
    pct_clay: "",
    pct_silt: "",
    pct_unit: "%",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    const _title = `Grain Size Distribution`;
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">{_title}</div>
        </div>
        <div>
          <SmartTag
            value={data.pct_gravel}
            placeholder={"Percent Gravel"}
            heading={`Gravel: ${data.pct_gravel || "N/A "}${data.pct_unit}`}
          />
          <SmartTag
            value={data.pct_sand}
            placeholder={"Percent Sand"}
            heading={`Sand: ${data.pct_sand || "N/A "}${data.pct_unit}`}
          />
          <SmartTag
            value={data.pct_fines}
            placeholder={"Percent Fines"}
            heading={`Fines: ${data.pct_fines || "N/A "}${data.pct_unit}`}
          />
          <SmartTag
            value={data.pct_clay}
            placeholder={"Percent Clay"}
            heading={`Fines: ${data.pct_clay || "N/A "}${data.pct_unit}`}
          />
          <SmartTag
            value={data.pct_clay}
            placeholder={"Percent Silt"}
            heading={`Fines: ${data.pct_silt || "N/A "}${data.pct_unit}`}
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
            heading={"Percent Gravel"}
            data={{ ...data }}
            value={data.pct_gravel}
            onUpdate={onUpdate}
            valueKey="pct_gravel"
            _min={0}
            unitKey="pct_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />

          <ParamSelectableUnit
            heading={"Percent Sand"}
            data={{ ...data }}
            value={data.pct_sand}
            onUpdate={onUpdate}
            valueKey="pct_sand"
            _min={0}
            unitKey="pct_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />

          <ParamSelectableUnit
            heading={"Percent Fines"}
            data={{ ...data }}
            value={data.pct_fines}
            onUpdate={onUpdate}
            valueKey="pct_fines"
            _min={0}
            unitKey="pct_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Percent Clay"}
            data={{ ...data }}
            value={data.pct_clay}
            onUpdate={onUpdate}
            valueKey="pct_clay"
            _min={0}
            unitKey="pct_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Percent Silt"}
            data={{ ...data }}
            value={data.pct_silt}
            onUpdate={onUpdate}
            valueKey="pct_silt"
            _min={0}
            unitKey="pct_unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
