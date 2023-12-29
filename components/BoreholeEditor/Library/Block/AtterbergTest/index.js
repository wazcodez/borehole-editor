import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Atterberg Tests",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="bowl" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Atterberg Tests",
    level: Terms.Block.Level.Sample,
    liquid_limit: "",
    plastic_limit: "",
    shrinkage_limit: "",
    plasticity_index: "",
    unit: "%",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    const atterbergExists =
      data.liquid_limit ||
      data.plastic_limit ||
      data.plasticity_index ||
      data.shrinkage_limit;
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Atterberg</div>
        </div>
        <div>
          <SmartTag
            value={atterbergExists}
            placeholder={"Liquid Limit"}
            heading={`LL: ${data.liquid_limit || "N/A "}% `}
          />
          <SmartTag
            value={atterbergExists}
            placeholder={"Plastic Limit"}
            heading={`PL: ${data.plastic_limit || "N/A "}% `}
          />
          <SmartTag
            value={atterbergExists}
            placeholder={"Plasticity Index"}
            heading={`PI: ${data.plasticity_index || "N/A "}% `}
          />
          <SmartTag
            value={atterbergExists}
            placeholder={"Shrinkage Limit"}
            heading={`SL: ${data.shrinkage_limit|| "N/A "}% `}
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
            heading={"Liquid Limit (LL)"}
            data={{ ...data }}
            value={data.liquid_limit}
            onUpdate={onUpdate}
            valueKey="liquid_limit"
            unitKey="unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Plastic Limit (PL)"}
            data={{ ...data }}
            value={data.plastic_limit}
            onUpdate={onUpdate}
            valueKey="plastic_limit"
            unitKey="unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Plasticity Index (PI)"}
            data={{ ...data }}
            value={data.plasticity_index}
            onUpdate={onUpdate}
            valueKey="plasticity_index"
            unitKey="unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
          <ParamSelectableUnit
            heading={"Shrinkage Limit (SL)"}
            data={{ ...data }}
            value={data.shrinkage_limit}
            onUpdate={onUpdate}
            valueKey="shrinkage_limit"
            unitKey="unit"
            defaultOption={"%"}
            _options={[{ value: "%", title: "%" }]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
