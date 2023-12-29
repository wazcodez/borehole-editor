import React from "react";
import { useDrop } from "react-dnd";
import { BlockTypes } from "./../../Library/Block/BlockTypes";
import EditorViewWrapper from "./Wrapper";
import EditorViewDragMessage from "./DragMessage/";

const dragColorStyle = (isOver, canDrop) => {
  // Indicate to drop off the block
  if (canDrop && isOver) {
    return {
      borderColor: "border-green-300",
      backgroundColor: "bg-green-300",
    };
  }

  // Indicate dropping location
  if (canDrop) {
    return {
      borderColor: "border-yellow-300",
      backgroundColor: "bg-yellow-300",
    };
  }

  // Nominal state
  return {
    borderColor: "border-purple-200",
    backgroundColor: "bg-purple-200",
  };
};

const get_content = (children, isActive) => {
  if (children !== undefined && children.length > 0) {
    return children;
  }
  return <EditorViewDragMessage isActive={isActive}></EditorViewDragMessage>;
};

const EditorViewContainer = ({
  heading,
  sub_heading,
  onAdd,
  children,
  accepts,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: accepts,
    drop: (data) => {
      onAdd(data);
      //   onAdd(
      //     uuidv4(),
      //     data.type,
      //     Object.values(BlockTypes).find((i) => i.type === data.type).schema
      //   );
      return { name: "something" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const { borderColor, backgroundColor } = dragColorStyle(isOver, canDrop);

  return (
    <EditorViewWrapper
      bgHeadingColor={backgroundColor}
      borderDragDropColor={borderColor}
      heading={heading}
      sub_heading={sub_heading}
    >
      <div
        ref={drop}
        className={`border-l-4 border-r-4 flex flex-col ${borderColor}`}
      >
        {get_content(children, isOver && canDrop)}
      </div>
    </EditorViewWrapper>
  );
};

export default EditorViewContainer;
