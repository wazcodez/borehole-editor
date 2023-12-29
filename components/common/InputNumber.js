import { InputNumber as AntInputNumber } from "antd";

const InputNumber = (props) => {
  return (
    <div className="inputNumber">
      <AntInputNumber {...props}></AntInputNumber>
    </div>
  );
};

export default InputNumber;
