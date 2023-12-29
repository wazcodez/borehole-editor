import BlockRowViewLayout from "./../BlockRowViewLayout";
import Icon from "./../../../../common/Icon";
import { Tag } from "antd";

const LithologyViewer = ({ data }) => {
  const { title, description, start_depth, end_depth, depth_unit } = data;

  const icon =
    title || description ? (
      <Icon name={"lithology"} />
    ) : (
      <Icon name={"lithology"} style={"text-gray-500"} />
    );

  const depths =
    start_depth && end_depth && depth_unit ? (
      <Tag
        color="blue"
        style={{
          display: "flex",
          alignItems: "center",
          height: "70%",
          lineHeight: "auto",
        }}
      >{`${start_depth} - ${end_depth} ${depth_unit}`}</Tag>
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
  const heading = title ? (
    <h2 className="pr-2 border-r border-gray-200">{title}</h2>
  ) : (
    <h2 className="pr-2 border-r border-gray-200 text-gray-500">
      Strata Unit Heading
    </h2>
  );
  const subtext = description ? (
    <p className="text-xs whitespace-pre-wrap">{description}</p>
  ) : (
    <p className="text-xs text-gray-500">Strata Unit Description</p>
  );
  return (
    <BlockRowViewLayout icon={icon}>
      <div className="flex flex-col flex-wrap">
        <div
          className="flex flex-row flex-wrap"
          style={{ alignItems: "center" }}
        >
          <div>{depths}</div>
          <div>{heading}</div>
        </div>
        <div className="flex flex-row flex-wrap">{subtext}</div>
      </div>
    </BlockRowViewLayout>
  );
};
export default LithologyViewer;
