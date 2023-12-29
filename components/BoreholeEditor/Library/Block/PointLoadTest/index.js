import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";

const GuideContent = <div></div>;

export default {
  type: "Point Load Test",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="arrows" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Point Load Test",
    level: Terms.Block.Level.Sample,
    test_type: "",
    uncorrected_point_load_streth_index: "",
    corrected_point_load_streth_index: "",
    estimated_UCS: "",
    ucs_unit: "KPa",
    point_load_streth_index_unit: "[-]",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Point Load Test</div>
        </div>
        <div>
          <SmartTag
            value={data.test_type}
            placeholder={"Test Type"}
            heading={`${data.test_type || "N/A "}`}
          />
          <SmartTag
            value={data.estimated_UCS}
            placeholder={"Estimated UCS"}
            heading={`E. UCS:${data.estimated_UCS || "N/A "} ${data.ucs_unit}`}
          />
          <SmartTag
            value={data.uncorrected_point_load_streth_index}
            placeholder={"Uncorrected Point Load Strength Index"}
            heading={`UPLI:${
              data.uncorrected_point_load_streth_index || "N/A "
            } ${data.point_load_streth_index_unit}`}
          />
          <SmartTag
            value={data.corrected_point_load_streth_index}
            placeholder={"Corrected Point Load Strength Index"}
            heading={`CPLI:${
              data.corrected_point_load_streth_index || "N/A "
            } ${data.point_load_streth_index_unit}`}
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
            heading={"Test Type"}
            value={data.test_type}
            onUpdate={onUpdate}
            valueKey={"test_type"}
            _options={[
              { title: "Diametral Test", value: "Diametral Test" },
              { title: "Axial Test", value: "Axial Test" },
              {
                title: "Block Lump Test",
                value: "Block Lump Test",
              },
              {
                title: "Irregular Lump Test",
                value: "Irregular Lump Test",
              },
            ]}
          />
          <ParamSelectableUnit
            heading={"Uncorrected Point Load Strength Index (UPLSI)"}
            data={{ ...data }}
            value={data.uncorrected_point_load_streth_index}
            onUpdate={onUpdate}
            valueKey="uncorrected_point_load_streth_index"
            unitKey="point_load_streth_index_unit"
            defaultOption={data.point_load_streth_index_unit}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
          <ParamSelectableUnit
            heading={"Corrected Point Load Strength Index (CPLSI)"}
            data={{ ...data }}
            value={data.corrected_point_load_streth_index}
            onUpdate={onUpdate}
            valueKey="corrected_point_load_streth_index"
            unitKey="point_load_streth_index_unit"
            defaultOption={data.point_load_streth_index_unit}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
          <ParamSelectableUnit
            heading={"Estimated UCS (E. UCS)"}
            data={{ ...data }}
            value={data.estimated_UCS}
            onUpdate={onUpdate}
            valueKey="estimated_UCS"
            unitKey="ucs_unit"
            defaultOption={data.ucs_unit}
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
