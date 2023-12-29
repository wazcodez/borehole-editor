import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SmartTag from "./../../../../common/SmartTag/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import DescriptionInput from "../../../../common/DataEntry/DescriptionInput";
import Terms from "./../../../../../util/terms";

import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
const GuideContent = <div></div>;

export default {
  type: "Defect (Rock)",
  level: Terms.Block.Level.Sample,
  icon: <Icon name="rockwithcracks" />,
  multipleAllowed: false,
  guide: GuideContent,
  schema: {
    type: "Defect (Rock)",
    level: Terms.Block.Level.Sample,
    type_of_defect: "",
    description: "",
    angle_of_defect: "",
    angle_of_defect_unit: "deg",
  },
  view: (_data) => {
    const data = { ..._data.data };
    const _title = data.type_of_defect
      ? `Defect - ${data.type_of_defect} `
      : `Defect`;
    return (
      <div className="flex flex-col">
        <div className="flex flex-row justify-between">
          <div className="text-xs uppercase">{_title}</div>
        </div>
        <div>
          <SmartTag
            value={data.type_of_defect}
            placeholder={"Defect"}
            heading={`${data.angle_of_defect || "N/A"}${
              data.angle_of_defect_unit
            } perpendicular relative to core. ${data.description}`}
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
            heading={"Defect Type"}
            value={data.type_of_defect}
            onUpdate={onUpdate}
            valueKey={"type_of_defect"}
            _options={[
              {
                value: "Joint",
                title: "Joint",
              },
              {
                value: "Fracture",
                title: "Fracture",
              },
              {
                value: "Fracture Zone",
                title: "Fracture Zone",
              },
              {
                value: "Broken Zone",
                title: "Broken Zone",
              },
              {
                value: "Other",
                title: "Other",
              },
            ]}
          />

          <ParamSelectableUnit
            heading={"Angle of Defect (relative perp. to core)"}
            data={{ ...data }}
            value={data.angle_of_defect}
            onUpdate={onUpdate}
            valueKey="angle_of_defect"
            unitKey="angle_of_defect_unit"
            defaultOption={"deg"}
            _options={[{ value: "deg", title: "deg" }]}
          />

          <DescriptionInput
            heading={"Defect Description"}
            description={data.description}
            onUpdate={onUpdate}
            data={data}
            placeholder={"Defect Description (if any)"}
          />
        </EditBlock>
      </Edit>
    );
  },
};
