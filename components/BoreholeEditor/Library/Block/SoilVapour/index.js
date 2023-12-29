import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: Terms.Block.Type.soilVapour,
  level: Terms.Block.Level.Sample,
  icon: <Icon name="detector" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: Terms.Block.Type.soilVapour,
    level: Terms.Block.Level.Sample,
    cov: "",
    tov: "",
    cov_unit: "LEL",
    tov_unit: "LEL",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    const soilVapourExists =
      data.cov ||
      data.tov;
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Soil Vapour</div>
        </div>
        <div>
          <SmartTag
            value={soilVapourExists}
            placeholder={"COV"}
            heading={`COV: ${data.cov} ${data.cov_unit}`}
          />
           <SmartTag
            value={soilVapourExists}
            placeholder={"TOV"}
            heading={`TOV: ${data.tov} ${data.tov_unit}`}
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
            heading={"COV"}
            data={{ ...data }}
            value={data.cov}
            onUpdate={onUpdate}
            valueKey="cov"
            _min={0}
            unitKey="cov_unit"
            defaultOption={data.cov_unit}
            _options={[
              { value: "LEL", title: "LEL" },
              { value: "ppm", title: "ppm" },
            ]}
          />
          <ParamSelectableUnit
            heading={"TOV"}
            data={{ ...data }}
            value={data.tov}
            onUpdate={onUpdate}
            valueKey="tov"
            _min={0}
            unitKey="tov_unit"
            defaultOption={data.tov_unit}
            _options={[
              { value: "LEL", title: "LEL" },
              { value: "ppm", title: "ppm" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
