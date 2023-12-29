import EditorViewContainer from "./../EditorViewContainer/";
import uuidv4 from "./../../../../util/uuid";
import { BlockTypes } from "./../../Library/Block/BlockTypes";
import Terms from "./../../../../util/terms";

const accepts = Object.values(BlockTypes)
  .filter((f) => f.type === Terms.Block.Level.Drilling)
  .map((i) => i.type);

const drilling_on_add = (onAdd, data) => {
  return onAdd(
    uuidv4(),
    data.type,
    Object.assign(
      {},
    Object.values(BlockTypes).find((i) => i.type === data.type).schema
    )
  );
};

const EditorViewDrilling = ({ onAdd, children, boreholeID }) => {
  return (
    <EditorViewContainer
      onAdd={(data) => {
        drilling_on_add(onAdd, data);
      }}
      heading={`Drilling`}
      sub_heading={boreholeID ? boreholeID : `Borehole ID`}
      accepts={[...accepts]}
    >
      {children}
    </EditorViewContainer>
  );
};

export default EditorViewDrilling;
