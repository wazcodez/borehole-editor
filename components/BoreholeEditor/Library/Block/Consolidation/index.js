import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

export default {
  type: "Consolidation",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="barometer" />,
  multipleAllowed: false,
  schema: {
    type: "Consolidation",
    level: Terms.Block.Level.Sample,
    coefficient_of_consolidation: "", //(C_v) - cm/s^2
    coefficient_of_consolidation_unit: "cm/s^2",
    compression_index: "", // (C_c) - unitless
    compression_index_unit: "[-]",
    swell_index: "", // (C_s) - unitless
    swell_index_unit: "[-]",
    initial_void_ratio: "", // (e_0) - unitless
    initial_void_ratio_unit: "[-]",
    preconsolidation_pressure: "", // (sigma’_c) - kPa, MPa, Pa, etc.
    preconsolidation_pressure_unit: "kPa",
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">Consolidation</div>
        </div>
        <div className="mt-1">
          <SmartTag
            value={data.coefficient_of_consolidation}
            placeholder={"Coefficient of consolidation (Cv)"}
            heading={`Cv: ${data.coefficient_of_consolidation} ${data.coefficient_of_consolidation_unit}`}
          />
          <SmartTag
            value={data.compression_index}
            placeholder={"Compression Index (Cc)"}
            heading={`Cc: ${data.compression_index} ${data.compression_index_unit}`}
          />
          <SmartTag
            value={data.swell_index}
            placeholder={"Swell Index (Cs)"}
            heading={`Cs: ${data.swell_index} ${data.swell_index_unit}`}
          />
          <SmartTag
            value={data.initial_void_ratio}
            placeholder={"Initial Void Ratio (e0)"}
            heading={`e0: ${data.initial_void_ratio} ${data.initial_void_ratio_unit}`}
          />
          <SmartTag
            value={data.preconsolidation_pressure}
            placeholder={"Preconsolidation Pressure (sigma C)"}
            heading={`sigma C': ${data.preconsolidation_pressure} ${data.preconsolidation_pressure_unit}`}
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
            heading={"Coefficient of Consolidation (Cv)"}
            data={data}
            value={data.coefficient_of_consolidation}
            onUpdate={onUpdate}
            valueKey="coefficient_of_consolidation"
            _min={0}
            unitKey="coefficient_of_consolidation_unit"
            defaultOption={data.coefficient_of_consolidation_unit}
            _options={[
              { value: "cm/s^2", title: "cm/s^2" },
              { value: "mm/s^2", title: "mm/s^2" },
            ]}
          />
          <ParamSelectableUnit
            heading={"Compression Index (Cc)"}
            data={data}
            value={data.compression_index}
            onUpdate={onUpdate}
            valueKey="compression_index"
            _min={0}
            unitKey="compression_index_unit"
            defaultOption={data.compression_index_unit}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
          <ParamSelectableUnit
            heading={"Swell Index (Cs)"}
            data={data}
            value={data.swell_index}
            onUpdate={onUpdate}
            valueKey="swell_index"
            _min={0}
            unitKey="swell_index_unit"
            defaultOption={data.swell_index_unit}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
          <ParamSelectableUnit
            heading={"Initial Void Ratio (e0)"}
            data={data}
            value={data.initial_void_ratio}
            onUpdate={onUpdate}
            valueKey="initial_void_ratio"
            _min={0}
            unitKey="initial_void_ratio_unit"
            defaultOption={data.initial_void_ratio_unit}
            _options={[{ value: "[-]", title: "[-]" }]}
          />
          <ParamSelectableUnit
            heading={"Preconsolidation Pressure (Sigma c')"}
            data={data}
            value={data.preconsolidation_pressure}
            onUpdate={onUpdate}
            valueKey="preconsolidation_pressure"
            _min={0}
            unitKey="preconsolidation_pressure_unit"
            defaultOption={data.preconsolidation_pressure_unit}
            _options={[
              { value: "kPa", title: "kPa" },
              { value: "MPa", title: "MPa" },
            ]}
          />
        </EditBlock>
      </Edit>
    );
  },
};
