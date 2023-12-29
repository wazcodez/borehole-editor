import EditorViewContainer from "./../EditorViewContainer/";
import uuidv4 from "./../../../../util/uuid";
import { BlockTypes } from "./../../Library/Block/BlockTypes";
import Terms from "./../../../../util/terms";

const accepts = Object.values(BlockTypes)
  .filter((f) => f.type === Terms.Block.Level.Sample || f.type === Terms.Block.Type.pointSample)
  .map((i) => i.type);

const sample_on_add = (onAdd, data) => {
  return onAdd(
    uuidv4(),
    data.type,
    Object.assign(
      {},
      Object.values(BlockTypes)
        .find((i) => i.type === data.type)
        .get_schema()
    )
  );
};

const EditorViewLabSamples = ({ onAdd, children, boreholeID }) => {
  return (
    <EditorViewContainer
      onAdd={(data) => {
        sample_on_add(onAdd, data);
      }}
      heading={`Samples and Measurements`}
      sub_heading={boreholeID ? boreholeID : `Borehole ID`}
      accepts={[...accepts]}
    >
      {children}
    </EditorViewContainer>
  );
};

export default EditorViewLabSamples;
