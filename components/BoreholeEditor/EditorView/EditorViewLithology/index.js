import EditorViewContainer from "./../EditorViewContainer/";
import uuidv4 from "./../../../../util/uuid";
import { BlockTypes } from "./../../Library/Block/BlockTypes";

const accepts = Object.values(BlockTypes)
  .filter((f) => f.type === "lithology")
  .map((i) => i.type);

const lithology_on_add = (onAdd, data) => {
  return onAdd(
    uuidv4(),
    data.type,
    Object.values(BlockTypes).find((i) => i.type === data.type).schema
  );
};

const EditorViewLithology = ({ onAdd, children, boreholeID }) => {
  return (
    <EditorViewContainer
      onAdd={(data) => {
        lithology_on_add(onAdd, data);
      }}
      heading={`Lithology`}
      sub_heading={boreholeID ? boreholeID : `Borehole ID`}
      accepts={[...accepts]}
    >
      {children}
    </EditorViewContainer>
  );
};

export default EditorViewLithology;
