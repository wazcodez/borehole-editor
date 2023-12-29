import { Tag } from "antd";

const SmartTag = ({ value, placeholder, heading, height }) => {
  if (value === null || value === undefined || value === "") {
    return <Tag>{placeholder}</Tag>;
  } else {
    return <Tag color={"blue"}>{heading}</Tag>;
  }
};

export default SmartTag;
