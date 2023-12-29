import Icon from "./../../../../common/Icon";
import Terms from "./../../../../../util/terms";
import WellLogViewer from "./WellLogViewer";
import WellLogEditor from "./WellLogEditor";

const GuideContent = <div></div>;

export default {
  type: Terms.Block.Type.wellLog,
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="waterwell" />,
  multipleAllowed: true,
  guide: GuideContent,
  get_schema: () => {
    return {
      type: Terms.Block.Type.wellLog,
      level: Terms.Block.Level.Borehole,
      well_use: "",
      well_type: "",
      plug_type: "",
      well_casing: "",
      depth_unit: "m",
      installation_date: null,
      sparseCellData: {},
      private_notes: "",
    };
  },
  schema: {
    type: Terms.Block.Type.wellLog,
    level: Terms.Block.Level.Borehole,
    well_use: "",
    well_type: "",
    plug_type: "",
    well_casing: "",
    depth_unit: "m",
    installation_date: null,
    sparseCellData: {},
    private_notes: "",
  },
  view: (data) => {
    return <WellLogViewer data={data}></WellLogViewer>;
  },
  editor: (data, onUpdate, idx) => {
    return (
      <WellLogEditor
        data={data}
        onUpdate={onUpdate}
        idx={idx}
      ></WellLogEditor>
    );
  },
};
