import Icon from "./../../../../common/Icon";
import SampleViewer from "./SampleViewer";
import SampleEditor from "./SampleEditor";
import Terms from "./../../../../../util/terms";

export default {
  type: Terms.Block.Type.pointSample,
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="sampledepthpoint" />,
  multipleAllowed: true,
  get_schema: () => {
    return {
      type: Terms.Block.Type.pointSample,
      level: Terms.Block.Level.Borehole,
      title: "",
      description: "",
      depth: "",
      depth_unit: "m",
      items: [],
    };
  },
  schema: {
    type: Terms.Block.Type.pointSample,
    level: Terms.Block.Level.Borehole,
    title: "",
    description: "",
    depth: "",
    depth_unit: "m",
    items: [],
  },
  view: (
    data,
    onAdd,
    onUpdate,
    onSampleClick,
    onItemClick,
    selectedSampleIndex
  ) => {
    return (
      <SampleViewer
        data={data}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onSampleClick={onSampleClick}
        onSampleItemClick={onItemClick}
        selectedSampleIndex={selectedSampleIndex}
      ></SampleViewer>
    );
  },
  editor: (data, onUpdate, idx) => {
    //return <div></div>;
    return (
      <SampleEditor data={data} onUpdate={onUpdate} idx={idx}></SampleEditor>
    );
  },
};
