const EditorViewRow = ({ children, onClick, idx, isActive }) => {
  return (
    <div
      className={`flex flex-row justify-between p-2 border-b-2 cursor-pointer ${
        isActive === true ? "bg-gray-200 shadow" : "bg-gray-100 shadow"
      }`}
      onClick={() => {
        onClick(idx);
      }}
    >
      <div className="flex flex-row">
        <div>{children}</div>
      </div>
      <div className="flex flex-row">
        <div>
          <svg
            className="h-6 w-6 fill-current text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-gray-200"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EditorViewRow;
