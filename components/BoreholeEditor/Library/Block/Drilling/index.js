import Icon from "./../../../../common/Icon";
import { Edit } from "./../Generic/index";
import EditBlock from "./../Generic/Wrapper";
import SelectBar from "../../../../common/DataEntry/SelectBar/v2";
import BlockRowViewLayout from "./../BlockRowViewLayout";
import { Tag } from "antd";
import DepthInput from "./../../../../common/DataEntry/DepthInput/v2";
import SmartTag from "./../../../../common/SmartTag/";
import DescriptionInput from "./../../../../common/DataEntry/DescriptionInput/";
import TextInput from "./../../../../common/DataEntry/TextInput/";
import ParamSelectableUnit from "../../../../common/DataEntry/ParamSelectableUnit/v2";
import Terms from "./../../../../../util/terms";

export default {
  type: "drilling",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="drilling" />,
  multipleAllowed: true,
  schema: {
    type: "drilling",
    level: Terms.Block.Level.Borehole,
    ground_elev: null,
    start_depth: null,
    end_depth: null,
    depth_unit: "m",
    elev_unit: "",
    drillbit: "",
    casing: "",
    description: "",
  },
  view: (_data) => {
    const data = { ..._data };
    const icon =
      data.drillbit || data.casing ? (
        <Icon name={"drilling"} />
      ) : (
        <Icon name={"drilling"} style={"text-gray-500"} />
      );
    const depths =
      data.start_depth && data.end_depth && data.depth_unit ? (
        <Tag
          color="blue"
          style={{
            display: "flex",
            alignItems: "center",
            height: "70%",
            lineHeight: "auto",
          }}
        >{`${data.start_depth} - ${data.end_depth} ${data.depth_unit}`}</Tag>
      ) : (
        <Tag
          style={{
            display: "flex",
            alignItems: "center",
            height: "70%",
            lineHeight: "auto",
          }}
        >
          Depth Range
        </Tag>
      );

    const subtext = data.description ? (
      <p className="text-xs whitespace-pre-wrap">{data.description}</p>
    ) : (
      <p className="text-xs text-gray-500">Field notes... </p>
    );

    return (
      <BlockRowViewLayout icon={icon}>
        <div className="flex flex-col flex-wrap">
          <div
            className="flex flex-row flex-wrap"
            style={{ alignItems: "center" }}
          >
            <SmartTag
              value={data.ground_elev && data.ground_elev}
              placeholder={"Ground Elevation"}
              heading={`${data.ground_elev} ${data.elev_unit}`}
            />
            <div>{depths}</div>
            <SmartTag
              value={data.casing}
              placeholder={"Casing"}
              heading={`${data.casing}`}
            />
            <SmartTag
              value={data.drillbit}
              placeholder={"Drillbit"}
              heading={`${data.drillbit}`}
            />
          </div>
          <div className="flex flex-row flex-wrap">{subtext}</div>
        </div>
      </BlockRowViewLayout>
    );
  },
  editor: (data, onUpdate, idx) => {
    return (
      <Edit>
        <EditBlock title={"Details"}>
          <ParamSelectableUnit
            heading={"Ground Elevation"}
            data={{ ...data }}
            value={data.ground_elev}
            onUpdate={onUpdate}
            valueKey="ground_elev"
            unitKey="elev_unit"
            defaultOption={data.elev_unit}
            _options={[
              { title: "masl", value: "masl" },
              { title: "fasl", value: "fasl" },
            ]}
          />

          <DepthInput
            start_depth={data.start_depth}
            end_depth={data.end_depth}
            depth_unit={data.depth_unit}
            onUpdate={onUpdate}
            data={{ ...data }}
            _min={0}
            unit_options={[
              { title: "m", value: "m" },
              { title: "ft", value: "ft" },
            ]}
          />

          {/* TODO: Add Drillbit Options */}
          <TextInput
            heading={"Drillbit"}
            value={data.drillbit}
            onUpdate={onUpdate}
            data={data}
            valueKey="drillbit"
            placeholder={"Drillbit"}
          />

          <TextInput
            heading={"Casing"}
            value={data.casing}
            onUpdate={onUpdate}
            data={data}
            valueKey="casing"
            placeholder={"Casing"}
          />

          {/*         
          <SelectBar
            data={{ ...data }}
            heading={"Drillbit"}
            value={data.drillbit}
            onUpdate={onUpdate}
            valueKey={"drillbit"}
            _options={[
              { value: "sulfate", title: "Sulfate" },
              { value: "chloride", title: "Chloride" },
            ]}
          /> */}

          {/* TODO: Add Casing */}
          {/* <SelectBar
            data={{ ...data }}
            heading={"Casing"}
            value={data.casing}
            onUpdate={onUpdate}
            valueKey={"casing"}
            _options={[
              { value: "sulfate", title: "Sulfate" },
              { value: "chloride", title: "Chloride" },
            ]}
          /> */}
        </EditBlock>

        <EditBlock title={"Notes"}>
          <DescriptionInput
            heading={"Notes"}
            description={data.description}
            onUpdate={onUpdate}
            data={data}
            placeholder={"Drilling Notes (if any)"}
          />
        </EditBlock>
      </Edit>
    );
  },
};
