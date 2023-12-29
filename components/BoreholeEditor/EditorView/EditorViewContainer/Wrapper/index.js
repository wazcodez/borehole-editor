const EditorViewWrapper = ({
  heading,
  sub_heading,
  bgHeadingColor,
  borderDragDropColor,
  children,
}) => {
  return (
    <div className="flex flex-col shadow bg-white mt-4">
      <div
        className={`flex flex-row ${bgHeadingColor} rounded-t-lg p-2 justify-between text-left text-sm leading-4 font-medium uppercase`}
      >
        <div className="pl-2">{heading}</div>
        <div className="border-l-4 border-purple-200 pl-2">{sub_heading}</div>
      </div>
      {children}
      <div
        className={`p-2 border-l-4 border-r-4 border-b-4 text-left text-xs ${borderDragDropColor}`}
      ></div>
    </div>
  );
};

export default EditorViewWrapper;
