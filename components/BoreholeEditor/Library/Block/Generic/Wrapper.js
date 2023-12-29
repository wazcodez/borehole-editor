import BlockRowEdit from "./../BlockRowEdit";
const BlockGenericWrapper = ({ title, children }) => {
  return (
    <div>
      <BlockRowEdit title={title}>
        <div className="pl-1">{children}</div>
      </BlockRowEdit>
    </div>
  );
};

export default BlockGenericWrapper;
