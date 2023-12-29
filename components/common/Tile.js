import React, { useState } from "react";
import Icon from "./Icon";

const TileBlock = ({ title, icon, selected }) => {
  const bgColor = selected === true ? "bg-green-300" : "";
  const borderColor =
    selected === true ? "border-green-500 border-2" : "border ";
  const color = selected === true ? "text-gray-700" : "text-gray-600 ";
  return (
    <div
      className={`flex flex-col pl-2 pr-2 pt-1 pb-1 m-1 rounded shadow hover:text-gray-700 cursor-pointer ${bgColor} ${borderColor} ${color}`}
    >
      <div className="flex justify-center align-middle mt-1">{icon}</div>
      <div className="text-center p-1">
        <div className="text-xs">{title}</div>
      </div>
    </div>
  );
};

const Tile = ({ items, current, onUpdate }) => {
  const [selected, setSelected] = useState(current);
  return (
    <div className="flex flex-wrap">
      {items.map((item, i) => {
        return (
          <div
            key={i}
            onClick={() => {
              if (i === selected) {
                setSelected(-1);
                onUpdate("");
                return;
              } else {
                setSelected(i);
              }
              onUpdate(items[i].title);
            }}
          >
            <TileBlock
              key={i}
              title={item.title}
              icon={<Icon name={item.icon} />}
              selected={i === selected}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Tile;
