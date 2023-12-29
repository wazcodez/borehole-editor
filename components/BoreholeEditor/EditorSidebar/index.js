const Sidebar = ({ children, width }) => {
  return (
    <div
      className="editor-sidebar bg-white w-full h-screen shadow overflow-y-scroll border-r border-primaryBorderDark"
      style={{ width: width }}
    >
      <div className="flex-grow w-full border-r bg-gray text-gray-700">
        {children}
      </div>
    </div>
  );
};

export default Sidebar;
