import Label from "./../../Label";

const TitleInput = ({ heading, title, onUpdate, placeholder, data }) => {
  return (
    <div>
      <Label title={heading} />
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          placeholder={placeholder}
          onChange={(e) => {
            onUpdate({
              ...data,
              title: e.target.value,
            });
          }}
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
          type="text"
          value={title}
        />
      </div>
    </div>
  );
};

export default TitleInput;
