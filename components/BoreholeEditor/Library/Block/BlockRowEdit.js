import Accordian from "./../../../common/Accordian";

export const BlockRowEdit = ({ children, title }) => {
  return (
    <div className="w-full p-2 border-b border-gray-300 mb-2">
      <Accordian
        title={<h4 className="block text-sm text-gray-700 mb-2">{title}</h4>}
        children={children}
      />
    </div>
  );
};

export default BlockRowEdit;
