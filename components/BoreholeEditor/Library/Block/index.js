import React from "react";
import { useDrag } from "react-dnd";

const Block = ({ title, type, logo, h = 30, w = 30 }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { title, type: type },
    options: {
      dropEffect: "copy",
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`${title} was dragged`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const style = isDragging
    ? `library-block-dragging flex flex-col m-2 p-2 rounded-lg border shadow-inner text-gray`
    : `library-block flex flex-col m-2 p-2 rounded-lg border shadow-md hover:shadow-lg cursor-move text-gray`;
  return (
    <div ref={drag} className={style}>
      <div className="library-block-logo flex justify-center align-middle mt-2">{logo}</div>
      <div className="library-block-title-container text-center p-1">
        <div className="library-block-title">{title}</div>
      </div>
    </div>
  );
};

export const BlockRow = ({ title, type, logo }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { title, type: type },
    options: {
      dropEffect: "copy",
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log(`${title} was dragged`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const style = isDragging
    ? "library-block-row-dragging flex flex-row p-1 m-2 items-center rounded-lg border shadow-md hover:shadow-lg"
    : "library-block-row flex flex-row p-1 m-2 items-center rounded-lg border shadow-md hover:shadow-lg cursor-move text-gray";
  return (
    <div ref={drag} className={style}>
      <div className="flex justify-center align-middle ml-2">
        {React.cloneElement(logo, { h: 8, w: 8 })}
      </div>
      <div className="text-center p-2 ml-1">
        <div className="library-block-row-title">{title}</div>
      </div>
    </div>
  );
};

export default Block;
