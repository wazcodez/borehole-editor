import Icon from "./../../../../common/Icon";
import LithologyViewer from "./LithologyViewer";
import LithologyEditor from "./LithologyEditor";
import Terms from "./../../../../../util/terms";

export default {
  type: "lithology",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="lithology" />,
  multipleAllowed: true,
  schema: {
    type: "lithology",
    level: Terms.Block.Level.Borehole,
    title: "",
    description: "",
    start_depth: "",
    end_depth: "",
    depth_unit: "m",
    material_type: "",
    uscs_classification: "",
    pattern: "",
    date: "",
    private_notes: "",
  },
  view: (data) => {
    return <LithologyViewer data={data} />;
  },
  editor: (data, onUpdate, idx) => {
    return (
      <LithologyEditor data={data} onUpdate={onUpdate} idx={idx}>
        Not implemented
      </LithologyEditor>
    );
  },
};
