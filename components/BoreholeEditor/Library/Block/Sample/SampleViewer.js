import React from "react";
import { useDrop } from "react-dnd";
import { BlockTypes } from "./../BlockTypes";
import { Tag } from "antd";
import uuidv4 from "./../../../../../util/uuid";
import SmartTag from "./../../../../common/SmartTag/";
import Terms from "./../../../../../util/terms";

const selectedStyle = (isActive) => {
  if (isActive === true) {
    return {
      backgroundColor: "bg-white",
      borderColor: "border-blue-300 border-2",
    };
  }
  return {
    backgroundColor: "bg-white",
    borderColor: "border-gray-200 border-2",
  };
};

const SampleViewer = ({
  data,
  onUpdate,
  onSampleClick,
  onSampleItemClick,
  selectedSampleIndex,
}) => {
  const {
    title,
    description,
    start_depth,
    end_depth,
    depth_unit,
    items,
    recovery,
    total_core_recovery,
    recovery_unit,
  } = data;
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: Object.values(BlockTypes)
      .filter(
        (f) =>
          f.type !== Terms.Block.Level.Sample &&
          f.level === Terms.Block.Level.Sample
      )
      .map((i) => i.type),
    drop: (d) => {
      onUpdate({
        id: uuidv4(),
        type: d.type,
        data: Object.assign(
          {},
          Object.values(BlockTypes).find((i) => i.type === d.type).schema
        ),
      });
      return { name: "something" };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // drop activity and styling
  const isActive = canDrop && isOver;
  let borderDragDropColor = "border-purple-200";
  let bgHeadingColor = "bg-purple-200";

  if (isActive) {
    borderDragDropColor = "border-green-300";
    bgHeadingColor = "bg-green-300";
  } else if (canDrop) {
    borderDragDropColor = "border-yellow-300";
    bgHeadingColor = "bg-yellow-300";
  }

  let content = data.items.map((item, i) => {
    const itemView = Object.values(BlockTypes).filter(
      (f) => f.type === item.type
    )[0];
    const { backgroundColor, borderColor } = selectedStyle(
      selectedSampleIndex === i
    );
    return (
      <div
        key={i}
        onClick={() => {
          onSampleItemClick(i);
        }}
        className={`p-2 shadow-xl bg-white rounded-lg ${backgroundColor} ${borderColor}`}
      >
        {itemView.view(item)}
      </div>
    );
  });

  const heading = title ? (
    <h2 className="pr-2">{title}</h2>
  ) : (
    <h2 className="pr-2 border-gray-200 text-gray-500">Sample #</h2>
  );

  const subtext = description ? (
    <p className="pr-2 text-xs">{description}</p>
  ) : (
    <p className="pr-2 text-xs text-gray-500">Sample notes... </p>
  );

  const depths =
    start_depth && end_depth && depth_unit ? (
      <Tag
        color="blue"
        style={{
          display: "flex",
          alignItems: "center",
          lineHeight: "auto",
        }}
      >{`${start_depth} - ${end_depth} ${depth_unit}`}</Tag>
    ) : (
      <Tag
        style={{
          display: "flex",
          alignItems: "center",
          lineHeight: "auto",
        }}
      >
        Depth Range
      </Tag>
    );

  return (
    <div
      ref={drop}
      className={`border-1 rounded shadow-sm flex flex-col w-full ${bgHeadingColor} ${borderDragDropColor}`}
    >
      <div
        className={`flex pl-2 pt-2 pb-1 flex-row justify-start align-middle shadow-inner ${borderDragDropColor}`}
        onClick={() => {
          onSampleClick();
        }}
      >
        <div>{heading}</div>
        <div className="flex items-center">{depths}</div>
        <SmartTag
          value={data.recovery}
          placeholder={"Recovery"}
          heading={`R: ${recovery} ${recovery_unit}`}
        />
        <SmartTag
          value={data.total_core_recovery}
          placeholder={"TCR"}
          heading={`TCR: ${total_core_recovery} ${recovery_unit}`}
        />
      </div>
      <div className="flex pl-2 pb-1 flex-row">{subtext}</div>

      {content.length > 0 && (
        <div className="flex p-1 m-2 flex-row shadow-inner flex-wrap bg-purple-100 rounded-lg">
          {content}
        </div>
      )}
    </div>
    // </EditorViewWrapper>
  );
};

export default SampleViewer;
