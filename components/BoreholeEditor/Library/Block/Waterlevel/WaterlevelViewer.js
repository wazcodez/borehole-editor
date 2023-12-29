import BlockRowViewLayout from "./../BlockRowViewLayout";
import Icon from "./../../../../common/Icon";
import { Tag } from "antd";

const Waterlevel = ({ data }) => {
  const { depth, depth_unit, measurement_date } = data;
  const current_measurement_date = new Date(measurement_date);
  const measurement_date_ = current_measurement_date.toDateString();

  const icon = depth ? (
    <Icon name={"waterlevel"} />
  ) : (
    <Icon name={"waterlevel"} style={"text-gray-500"} />
  );
  const heading = depth ? (
    <Tag
      color="blue"
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "auto",
      }}
    >
      {`${depth} ${depth_unit}`}
    </Tag>
  ) : (
    <Tag
      style={{
        display: "flex",
        alignItems: "center",
        lineHeight: "auto",
      }}
    >
      {`Water level Depth`}
    </Tag>
  );
  const _measurement_date = measurement_date_? (
    <div>{`${measurement_date_}`}</div>
  ) : (
    <span className="text-gray-500">Measurement Date</span>
  );

  return (
    <BlockRowViewLayout icon={icon}>
      <div className="flex flex-col flex-wrap  justify-center align-middle">
        <div className="flex flex-row flex-wrap">{heading}{_measurement_date}</div>
      </div>
    </BlockRowViewLayout>
  );
};

export default Waterlevel;
