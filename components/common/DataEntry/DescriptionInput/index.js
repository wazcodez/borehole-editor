import Label from "./../../Label";

const DescriptionInput = ({
  heading,
  description,
  onUpdate,
  placeholder,
  data,
}) => {
  return (
    <div>
      <Label title={heading} />
      <textarea
        placeholder={placeholder}
        value={description}
        onChange={(e) => {
          onUpdate({ ...data, description: e.target.value });
        }}
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      ></textarea>
    </div>
  );
};

export default DescriptionInput;
