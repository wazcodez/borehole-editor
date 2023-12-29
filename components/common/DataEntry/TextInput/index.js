import Label from "./../../Label";

const TextInput = ({
  heading,
  valueKey,
  value,
  onUpdate,
  placeholder,
  data,
}) => {
  return (
    <div>
      <Label title={heading} />
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          placeholder={placeholder}
          onChange={(e) => {
            onUpdate({
              ...data,
              [valueKey]: e.target.value,
            });
          }}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          value={value}
        />
      </div>
    </div>
  );
};

export default TextInput;
