import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamFixedUnitInput from "./../../../../common/DataEntry/ParamFixedUnitInput/";
import SmartTag from "./../../../../common/SmartTag/";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

const non_detect = "Non-detect (ND)";

const possible_contaminants = {
  Metal: [
    "Antimony",
    "Arsenic",
    "Barium",
    "Beryllium",
    "Boron (Hot Water Ext.)",
    "Boron",
    "Cadmium",
    "Chromium",
    "Cobalt",
    "Copper",
    "Lead",
    "Mercury",
    "Molybdenum",
    "Nickel",
    "Selenium",
    "Silver",
    "Thallium",
    "Uranium",
    "Vanadium",
    "Zinc",
    "Chromium, Hexavalent",
    "Sodium Adsorption Ratio",
    "Cyanide (Free)",
  ],
  "BTEX/PHCs": [
    "F1 (C6-C10) - BTEX",
    "F2 (C10-C16)",
    "F3 (C16-C34)",
    "F4 (C34-C50)",
    "F4G",
  ],
  VOC: [
    "Acetone",
    "Benzene",
    "Bromodichloromethane",
    "Bromoform",
    "Bromomethane",
    "Carbon tetrachloride",
    "Chlorobenzene",
    "Dibromochloromethane",
    "Chloroform",
    "1,2-Dibromoethane",
    "1,2-Dichlorobenzene",
    "1,3-Dichlorobenzene",
    "1,4-Dichlorobenzene",
    "Dichlorodifluoromethane",
    "1,1-Dichloroethane",
    "1,2-Dichloroethane",
    "1,1-Dichloroethylene",
    "cis-1,2-Dichloroethylene",
    "trans-1,2-Dichloroethylene",
    "Methylene Chloride",
    "1,2-Dichloropropane",
    "cis-1,3-Dichloropropene",
    "trans-1,3-Dichloropropene",
    "1,3-Dichloropropene (cis & trans)",
    "Ethylbenzene",
    "n-Hexane",
    "Methyl Ethyl Ketone",
    "Methyl Isobutyl Ketone",
    "MTBE",
    "Styrene",
    "1,1,1,2-Tetrachloroethane",
    "1,1,2,2-Tetrachloroethane",
    "Tetrachloroethylene",
    "Toluene",
    "1,1,1-Trichloroethane",
    "1,1,2-Trichloroethane",
    "Trichloroethylene",
    "Trichlorofluoromethane",
    "Vinyl chloride",
    "o-Xylene",
    "m+p-Xylenes",
    "Xylenes (Total)",
  ],
  PAH: [
    "Acenaphthene",
    "Acenaphthylene",
    "Anthracene",
    "Benzo(a)anthracene",
    "Benzo(a)pyrene",
    "Benzo(b/j)fluoranthene",
    "Benzo(ghi)perylene",
    "Benzo(k)fluoranthene",
    "Chrysene",
    "Dibenzo(a,h)anthracene",
    "Fluoranthene",
    "Fluorene",
    "Indeno(1,2,3-cd)pyrene",
    "1-Methylnaphthalene",
    "2-Methylnaphthalene",
    "Methylnaphthalene, 2-(1-)",
    "Naphthalene",
    "Phenanthrene",
    "Pyrene",
  ],
  PCB: [
    "Aroclor 1016",
    "Aroclor 1221",
    "Aroclor 1232",
    "Aroclor 1242",
    "Aroclor 1248",
    "Aroclor 1254",
    "Aroclor 1260",
    "Aroclor 1262",
    "Aroclor 1268",
    "Total PCB",
  ],
  ND: [non_detect],
};

export default {
  type: "Contamination",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="hydrocarbon" />,
  multipleAllowed: true,
  schema: {
    type: "Contamination",
    level: Terms.Block.Level.Sample,
    chemical: "",
    concentration: "",
    concentration_unit: "ppm",
  },
  view: (_data) => {
    const data = { ..._data.data };
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">
            {data.chemical || "Compounds N/A"}
          </div>
        </div>
        <div>
          <SmartTag
            value={data.concentration}
            placeholder={"Contamination"}
            heading={`${data.concentration} ${data.concentration_unit}`}
          />
        </div>
      </div>
    );
  },
  editor: (data, onUpdate, idx) => {
    const possible_items = Object.keys(possible_contaminants)
      .map((_type, i) => {
        return possible_contaminants[_type].map((_item, j) => {
          return {
            value: `${_type} - ${_item}`,
            title: `${_type} - ${_item}`,
          };
        });
      })
      .flat();
    const current_chemical = data.chemical;
    console.log(current_chemical);

    return (
      <Edit>
        <EditBlock title={"Details"}>
          <SelectBar
            data={{ ...data }}
            heading={"Compound"}
            value={data.chemical}
            onUpdate={(props) => {
              if (props.chemical !== undefined) {
                if (props.chemical === `ND - ${non_detect}`) {
                  props.concentration = "";
                }
              }
              onUpdate(props);
            }}
            valueKey={"chemical"}
            _options={[...possible_items]}
          />
          {data.chemical !== `ND - ${non_detect}` && (
            <ParamSelectableUnit
              heading={"Concentration"}
              data={{ ...data }}
              value={data.concentration}
              onUpdate={onUpdate}
              valueKey="concentration"
              unitKey="concentration_unit"
              defaultOption={data.concentration_unit}
              _min={0}
              _options={[
                { value: "ppm", title: "ppm" },
                { value: "mg/l", title: "mg/l" },
              ]}
            />
          )}
        </EditBlock>
      </Edit>
    );
  },
};
