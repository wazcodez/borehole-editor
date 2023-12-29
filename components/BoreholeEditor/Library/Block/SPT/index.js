import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import ParamSelectableUnit from "./../../../../common/DataEntry/ParamSelectableUnit/v2";
import SmartTag from "./../../../../common/SmartTag/";
import TableInput from "./../../../../common/DataEntry/TableInput/";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import Label from "../../../../common/Label";
import Terms from "./../../../../../util/terms";
import BlockRowViewLayout from "./../BlockRowViewLayout";

const GuideContent = <div></div>;

export default {
  type: "spt",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="density" />,
  multipleAllowed: false,
  guide: GuideContent,
  get_schema: () => {
    return {
      type: "spt",
      level: Terms.Block.Level.Borehole,
      depth_unit: "m",
      interval_unit: "cm",
      sparseCellData: {},
      private_notes: "",
    };
  },
  schema: {
    type: "spt",
    level: Terms.Block.Level.Borehole,
    depth_unit: "m",
    interval_unit: "cm",
    sparseCellData: {},
    private_notes: "",
  },
  view: (_data) => {
    const data = { ..._data.data };
    const icon = <Icon name={"density"}  />;
    // const icon =
    // Array.isArray(data.sparseCellData)? (
    //   <Icon name={"density"}  />
    // ) : (
    //   <Icon name={"density"} style={"text-gray-500"}/>
    // );
    return (
      <BlockRowViewLayout icon={icon}>
        <div className="flex flex-col flex-wrap  justify-center align-middle">
        {<div className="flex flex-row flex-wrap">SPT</div>}
        </div>
      </BlockRowViewLayout>
      // <div className="flex flex-col">
      //   <div className="flex flex-row justify-between">
      //     <div className="text-xs uppercase">SPT</div>
      //   </div>
      //   <div></div>
      // </div>
    );
  },
  editor: (data, onUpdate, idx) => {
    return (
      <Edit>
        <EditBlock title={"Details"}>
          <SelectBar
            data={{ ...data }}
            heading={"Depth Unit"}
            value={data.depth_unit}
            onUpdate={onUpdate}
            valueKey={"depth_unit"}
            _options={[
              { title: "m", value: "m" },
              { title: "cm", value: "cm" },
              { title: "ft", value: "ft" },
            ]}
          />
          <SelectBar
            data={{ ...data }}
            heading={"Interval Unit"}
            value={data.interval_unit}
            onUpdate={onUpdate}
            valueKey={"interval_unit"}
            _options={[
              { title: "m", value: "m" },
              { title: "cm", value: "cm" },
            ]}
          />
          <Label title={"SPT Table"}></Label>
          <TableInput
            cols={[`Depth`, `Interval`, "N"]}
            columnWidths={[90, 110, 70]}
            data={{ ...data }}
            onUpdate={onUpdate}
          ></TableInput>
        </EditBlock>
      </Edit>
    );
  },
};
