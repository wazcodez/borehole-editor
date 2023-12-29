const BlockRowVewLayout = ({ icon, children }) => {
  return (
    <div className="flex flex-row flex-wrap">
      <div className="mr-2">{icon}</div>
      {children}
    </div>
  );
};

export default BlockRowVewLayout;
