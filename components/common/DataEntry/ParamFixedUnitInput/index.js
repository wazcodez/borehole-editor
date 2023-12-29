import Label from "./../../Label";
import InputNumber from "./../../InputNumber";

const ParmaFixedUnitInput = ({
  data,
  onUpdate,
  heading,
  value,
  fixedUnit,
  valueKey,
  min,
  max,
  formatter,
  parser,
}) => {
  return (
    <div>
      <Label title={heading} />
      <div className="flex flex-row flex-wrap w-full align-middle items-center">
        <InputNumber
          size={"large"}
          value={value}
          min={min}
          max={max}
          defaultValue={value}
          formatter={formatter} // (value) => `${value}${fixedUnit}`}
          parser={parser} //(value) => value.replace(`${fixedUnit}`, "")}
          onChange={(val) => {
            onUpdate({
              ...data,
              [valueKey]: val,
            });
          }}
        />
      </div>
    </div>
  );
};

export default ParmaFixedUnitInput;
