import React, { useState } from "react";

const Accordian = ({ title, children }) => {
  const [isVisible, setVisibilty] = useState(true);
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between justify-center">
        <div>{title}</div>
        <div>
          <svg
            className="h-6 w-6 fill-current text-gray-500 hover:text-gray-700 cursor-pointer mr-1"
            fill="currentColor"
            viewBox="0 0 15 15"
            onClick={() => setVisibilty(!isVisible)}
          >
            <path
              fillRule="evenodd"
              d={
                isVisible === true
                  ? "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              }
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {isVisible && (
        <div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default Accordian;
