import Icon from "./../../../../common/Icon";
import SampleViewer from "./SampleViewer";
import SampleEditor from "./SampleEditor";
import Terms from "./../../../../../util/terms";

export default {
  type: Terms.Block.Level.Sample,
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="sampledepthrange" />,
  multipleAllowed: true,
  get_schema: () => {
    return {
      type: Terms.Block.Level.Sample,
      level: Terms.Block.Level.Borehole,
      title: "",
      description: "",
      start_depth: "",
      end_depth: "",
      depth_unit: "m",
      recovery: "",
      recovery_unit: "%",
      total_core_recovery: "",
      tcr_unit: "%",
      solid_core_recovery: "",
      scr_unit: "%",
      container: "",
      items: [],
    };
  },
  schema: {
    type: Terms.Block.Level.Sample,
    level: Terms.Block.Level.Borehole,
    title: "",
    description: "",
    start_depth: "",
    end_depth: "",
    depth_unit: "m",
    recovery: "",
    container: "",
    recovery_unit: "%",
    solid_core_recovery: "",
    scr_unit: "%",
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
