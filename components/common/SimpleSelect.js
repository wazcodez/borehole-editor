import { Select } from "antd";

const SimpleSelect = (props) => {
  const { children, ...other } = props;
  return (
    <div className="simpleSelect">
      <Select {...other}>{children}</Select>
    </div>
  );
};

export default SimpleSelect;
