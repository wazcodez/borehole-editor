import EditorViewContainer from "./../EditorViewContainer/";
import uuidv4 from "./../../../../util/uuid";
import { BlockTypes } from "./../../Library/Block/BlockTypes";
import Terms from "./../../../../util/terms";

const accepts = Object.values(BlockTypes)
  .filter(
    (f) =>
      f.type !== Terms.Block.Level.Sample &&
      f.type !== Terms.Block.Type.pointSample &&
      f.type !== "lithology" &&
      f.type !== "drilling" &&
      f.level === Terms.Block.Level.Borehole
  )
  .map((i) => i.type);

const overview_on_add = (onAdd, data) => {
  return onAdd(
    uuidv4(),
    data.type,
    Object.values(BlockTypes).find((i) => i.type === data.type).schema
  );
};

const EditorViewOverview = ({ onAdd, children, boreholeID }) => {
  return (
    <EditorViewContainer
      onAdd={(data) => {
        overview_on_add(onAdd, data);
      }}
      heading={`Overview`}
      sub_heading={boreholeID ? boreholeID : `Borehole ID`}
      accepts={[...accepts]}
    >
      {children}
    </EditorViewContainer>
  );
};

export default EditorViewOverview;
