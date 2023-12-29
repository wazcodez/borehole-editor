import React from "react";
import { BlockTypes } from "./../Library/Block/BlockTypes";
import BlockRowView from "./../Library/Block/BlockRowView";
import EditorViewRow from "./EditorViewRow/";
import EditorViewContainer from "./EditorViewContainer/";
import uuidv4 from "./../../../util/uuid";
import EditorViewOverview from "./EditorViewOverview/";
import EditorViewLabSamples from "./EditorViewLabSamples/";
import EditorViewLithology from "./EditorViewLithology/";
import EditorViewDrilling from "./EditorViewDrilling/";
import { EditableText, H3, H5 } from "@blueprintjs/core";
import { Intent, Spinner, Tag } from "@blueprintjs/core";
import moment from "moment";
import Terms from "./../../../util/terms";

function timeAgo(time) {
  moment.updateLocale("en", {
    relativeTime: {
      future: "in %s",
      past: "%s ago",
      s: (number) => number + "s ago",
      ss: "%ds ago",
      m: "1m ago",
      mm: "%dm ago",
      h: "1h ago",
      hh: "%dh ago",
      d: "1d ago",
      dd: "%dd ago",
      M: "a month ago",
      MM: "%d months ago",
      y: "a year ago",
      yy: "%d years ago",
    },
  });

  let secondsElapsed = moment().diff(time, "seconds");
  let dayStart = moment("2018-01-01").startOf("day").seconds(secondsElapsed);

  if (secondsElapsed > 300) {
    return moment(time).fromNow(true);
  } else if (secondsElapsed < 60) {
    return dayStart.format("s") + "s ago";
  } else {
    return dayStart.format("m:ss") + "m ago";
  }
}

// ---- Borehole Overview ----

const borehole_overview_accepted_types = Object.values(BlockTypes)
  .filter((f) => f.type !== Terms.Block.Level.Sample && f.level === Terms.Block.Level.Borehole)
  .map((i) => i.type);

const borehole_overview_on_add = (onAdd, data) => {
  return onAdd(
    uuidv4(),
    data.type,
    Object.values(BlockTypes).find((i) => i.type === data.type).schema
  );
};

// ---- Borehole Samples ----

// --- Editor Sample View ----

const EditorViewSampleItem = ({ children, isActive }) => {
  return (
    <div
      className={`flex flex-row justify-between p-3 border-b-2 cursor-pointer ${
        isActive === true ? "bg-gray-200 shadow" : "bg-gray-100 shadow"
      }`}
    >
      {children}
    </div>
  );
};

// --- Borehole Overview Items ----

// --- Borehole Sample Items ----

const inProgress = (
  <div className="flex justify-center align-middle items-center">
    <Spinner intent={Intent.PRIMARY} size={15} />
    <div className="ml-2">Saving</div>
  </div>
);
const EditorView = ({
  onAdd,
  onUpdate,
  rawid,
  items,
  onItemClick,
  selectedIndex,
  selectedSampleIndex,
  borehole_id,
  borehole_title,
  onBoreholeIdChange,
  onBoreholeTitleChange,
  dirty,
  last_modified,
}) => {
  const inSync = (
    <div>
      <Tag>
        <div className="flex justify-center align-middle items-center">{`saved ~ last edit was ${timeAgo(
          last_modified
        )}`}</div>
      </Tag>
      <a href={`/api/boreholes/print?pid=${rawid}`}>(download)</a>
    </div>
  );

  let overview_content = [];
  items.map((item, i) => {
    if (
      item.type !== Terms.Block.Level.Sample &&
      item.type !== Terms.Block.Type.pointSample &&
      item.type !== "lithology" &&
      item.type !== "drilling" &&
      item.data.level === Terms.Block.Level.Borehole
    ) {
      overview_content.push(
        <EditorViewRow
          key={i}
          onClick={(v) => {
            onItemClick(v, -1);
          }}
          idx={i}
          isActive={selectedIndex === i}
        >
          {Object.values(BlockTypes)
            .find((j) => j.type === item.type)
            .view(item.data)}
        </EditorViewRow>
      );
    }
  });

  let drilling_content = [];
  items.map((item, i) => {
    if (item.type === "drilling" && item.data.level === Terms.Block.Level.Borehole) {
      drilling_content.push(
        <EditorViewRow
          key={i}
          onClick={(v) => {
            onItemClick(v, -1);
          }}
          idx={i}
          isActive={selectedIndex === i}
        >
          {Object.values(BlockTypes)
            .find((j) => j.type === item.type)
            .view(item.data)}
        </EditorViewRow>
      );
    }
  });

  let lithology_content = [];
  items.map((item, i) => {
    if (item.type === "lithology" && item.data.level === Terms.Block.Level.Borehole) {
      lithology_content.push(
        <EditorViewRow
          key={i}
          onClick={(v) => {
            onItemClick(v, -1);
          }}
          idx={i}
          isActive={selectedIndex === i}
        >
          {Object.values(BlockTypes)
            .find((j) => j.type === item.type)
            .view(item.data)}
        </EditorViewRow>
      );
    }
  });

  let sample_content = [];
  items.map((item, i) => {
    if (item.type === Terms.Block.Level.Sample || item.type === Terms.Block.Type.pointSample) {
      sample_content.push(
        <EditorViewSampleItem key={i} isActive={selectedIndex === i}>
          {Object.values(BlockTypes)
            .find((j) => j.type === item.type)
            .view(
              item.data,
              onAdd,
              (_data) => {
                onUpdate(i, _data);
              },
              () => {
                onItemClick(i, -1);
              },
              (val) => {
                onItemClick(i, val);
              },
              selectedIndex === i ? selectedSampleIndex : -1
            )}
        </EditorViewSampleItem>
      );
    }
  });

  return (
    <div
      className="flex-1 p-2 bg-repeat bg-center overflow-auto pl-4 pr-4 pt-2"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3Crect stroke='%23ffffff' stroke-width='0.74' width='1' height='1' id='s'/%3E%3Cpattern id='a' width='3' height='3' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cuse fill='%23fafafa' href='%23s' y='2'/%3E%3Cuse fill='%23fafafa' href='%23s' x='1' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s' x='2' y='2'/%3E%3Cuse fill='%23f5f5f5' href='%23s'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='2'/%3E%3Cuse fill='%23f0f0f0' href='%23s' x='1' y='1'/%3E%3C/pattern%3E%3Cpattern id='b' width='7' height='11' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s'/%3E%3Cuse href='%23s' y='5' /%3E%3Cuse href='%23s' x='1' y='10'/%3E%3Cuse href='%23s' x='2' y='1'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='8'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='5' y='2'/%3E%3Cuse href='%23s' x='5' y='6'/%3E%3Cuse href='%23s' x='6' y='9'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='h' width='5' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23ebebeb'%3E%3Cuse href='%23s' y='5'/%3E%3Cuse href='%23s' y='8'/%3E%3Cuse href='%23s' x='1' y='1'/%3E%3Cuse href='%23s' x='1' y='9'/%3E%3Cuse href='%23s' x='1' y='12'/%3E%3Cuse href='%23s' x='2'/%3E%3Cuse href='%23s' x='2' y='4'/%3E%3Cuse href='%23s' x='3' y='2'/%3E%3Cuse href='%23s' x='3' y='6'/%3E%3Cuse href='%23s' x='3' y='11'/%3E%3Cuse href='%23s' x='4' y='3'/%3E%3Cuse href='%23s' x='4' y='7'/%3E%3Cuse href='%23s' x='4' y='10'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='c' width='17' height='13' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23e5e5e5'%3E%3Cuse href='%23s' y='11'/%3E%3Cuse href='%23s' x='2' y='9'/%3E%3Cuse href='%23s' x='5' y='12'/%3E%3Cuse href='%23s' x='9' y='4'/%3E%3Cuse href='%23s' x='12' y='1'/%3E%3Cuse href='%23s' x='16' y='6'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='d' width='19' height='17' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' y='9'/%3E%3Cuse href='%23s' x='16' y='5'/%3E%3Cuse href='%23s' x='14' y='2'/%3E%3Cuse href='%23s' x='11' y='11'/%3E%3Cuse href='%23s' x='6' y='14'/%3E%3C/g%3E%3Cg fill='%23e0e0e0'%3E%3Cuse href='%23s' x='3' y='13'/%3E%3Cuse href='%23s' x='9' y='7'/%3E%3Cuse href='%23s' x='13' y='10'/%3E%3Cuse href='%23s' x='15' y='4'/%3E%3Cuse href='%23s' x='18' y='1'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='e' width='47' height='53' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' x='2' y='5'/%3E%3Cuse href='%23s' x='16' y='38'/%3E%3Cuse href='%23s' x='46' y='42'/%3E%3Cuse href='%23s' x='29' y='20'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='f' width='59' height='71' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' x='33' y='13'/%3E%3Cuse href='%23s' x='27' y='54'/%3E%3Cuse href='%23s' x='55' y='55'/%3E%3C/g%3E%3C/pattern%3E%3Cpattern id='g' width='139' height='97' patternUnits='userSpaceOnUse' patternTransform='scale(10) translate(-900 -675)'%3E%3Cg fill='%23ffffff'%3E%3Cuse href='%23s' x='11' y='8'/%3E%3Cuse href='%23s' x='51' y='13'/%3E%3Cuse href='%23s' x='17' y='73'/%3E%3Cuse href='%23s' x='99' y='57'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23b)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23h)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23c)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23d)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23e)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23f)' width='100%25' height='100%25'/%3E%3Crect fill='url(%23g)' width='100%25' height='100%25'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="Polaris-Card Polaris-Card--newDesignLanguage rounded-lg flex flex-row justify-between p-2">
        <div>
          <h2 className="text-md capitalize text-gray-800">
            <EditableText
              value={borehole_title}
              onChange={(val) => {
                onBoreholeTitleChange(val);
              }}
              placeholder="Borehole Name"
            />
          </h2>
          <h6 className="text-xs mt-1 uppercase text-gray-600">
            <EditableText
              value={borehole_id}
              onChange={(val) => {
                onBoreholeIdChange(val);
              }}
              placeholder="Borehole ID"
            />
          </h6>
        </div>
        <div>{dirty === true ? inProgress : inSync}</div>
      </div>
      <EditorViewOverview boreholeID={borehole_id} onAdd={onAdd}>
        {overview_content}
      </EditorViewOverview>
      <EditorViewDrilling boreholeID={borehole_id} onAdd={onAdd}>
        {drilling_content}
      </EditorViewDrilling>

      <EditorViewLithology onAdd={onAdd} boreholeID={borehole_id}>
        {lithology_content}
      </EditorViewLithology>
      <EditorViewLabSamples onAdd={onAdd} boreholeID={borehole_id}>
        {sample_content}
      </EditorViewLabSamples>
    </div>
  );
};

export default EditorView;
