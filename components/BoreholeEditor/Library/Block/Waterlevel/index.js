import WaterlevelEditor from "./WaterlevelEditor";
import WaterlevelViewer from "./WaterlevelViewer";
import Icon from "./../../../../common/Icon";
import Terms from "./../../../../../util/terms";

export default {
  type: Terms.Block.Type.waterLevel,
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="waterlevel" />,
  multipleAllowed: true,
  schema: {
    type: Terms.Block.Type.waterLevel,
    level: Terms.Block.Level.Borehole,
    depth: "",
    measurement_date: null,
    depth_unit: "m",
    description: "",
  },
  view: (data) => {
    return <WaterlevelViewer data={data}></WaterlevelViewer>;
  },
  editor: (data, onUpdate, idx) => {
    return (
      <WaterlevelEditor
        data={data}
        onUpdate={onUpdate}
        idx={idx}
      ></WaterlevelEditor>
    );
  },
};
