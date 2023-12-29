import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import Terms from "./../../../../../util/terms";

const GuideContent = <div></div>;

export default {
  type: "Triaxial",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="cylinderdotted" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Triaxial",
    level: Terms.Block.Level.Sample,
    type_of_test: "",
    sigma_1: "",
    sigma_3: "",
    elastic_modulus: "",
    elastic_modulus_unit: "KPa",
    sigma_1_unit: "KPa",
    sigma_3_unit: "KPa",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    const _title = data.type_of_test
      ? `Triaxial (${data.type_of_test})`
      : `Triaxial`;
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">{_title}</div>
        </div>
        <div>
          <SmartTag
            value={data.sigma_1}
            placeholder={"Sigma 1"}
            heading={`S1:${data.sigma_1 || "N/A "} ${data.sigma_1_unit}`}
          />
          <SmartTag
            value={data.sigma_3}
            placeholder={"Sigma 3"}
            heading={`S3:${data.sigma_3 || "N/A "} ${data.sigma_3_unit}`}
          />
          <SmartTag
            value={data.elastic_modulus}
            placeholder={"Elastic Modulus"}
            heading={`E:${data.elastic_modulus || "N/A "} ${data.elastic_modulus_unit}`}
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
            heading={"Type of Test"}
            value={data.type_of_test}
            onUpdate={onUpdate}
            valueKey={"type_of_test"}
            _options={[
              {
                value: "Unconsolidated - drained",
                title: "Unconsolidated - drained",
              },
              {
                value: "Unconsolidated - undrained",
                title: "Unconsolidated - undrained",
              },
              {
                value: "Consolidated - drained",
                title: "Consolidated - drained",
              },
              {
                value: "Rock",
                title: "Rock",
              },
            ]}
          />

          <ParamSelectableUnit
            heading={"Sigma 1 (S1)"}
            data={{ ...data }}
            value={data.sigma_1}
            onUpdate={onUpdate}
            valueKey="sigma_1"
            _min={0}
            unitKey="sigma_1_unit"
            defaultOption={data.sigma_1_unit}
            _options={[
              { value: "KPa", title: "KPa" },
              { value: "MPa", title: "MPa" },
            ]}
          />
          <ParamSelectableUnit
            heading={"Sigma 3 (S3)"}
            data={{ ...data }}
            value={data.sigma_3}
            _min={0}
            onUpdate={onUpdate}
            valueKey="sigma_3"
            unitKey="sigma_3_unit"
            defaultOption={data.sigma_3_unit}
            _options={[
              { value: "KPa", title: "KPa" },
              { value: "MPa", title: "MPa" },
            ]}
          />
          <ParamSelectableUnit
            heading={"Elastic Modulus (E)"}
            data={{ ...data }}
            value={data.elastic_modulus}
            _min={0}
            onUpdate={onUpdate}
            valueKey="elastic_modulus"
            unitKey="elastic_modulus_unit"
            defaultOption={data.elastic_modulus_unit}
            _options={[
              { value: "KPa", title: "KPa" },
              { value: "MPa", title: "MPa" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
