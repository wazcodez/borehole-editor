import NoteEditor from "./NoteEditor";
import NoteViewer from "./NoteViewer";
import Icon from "./../../../../common/Icon";
import Terms from "./../../../../../util/terms";

export default {
  type: "note",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="notes" />,
  multipleAllowed: false,
  schema: {
    type: "note",
    level: Terms.Block.Level.Borehole,
    description: "",
    title: "",
    date: "",
    private_notes: "",
  },
  view: (data) => {
    return <NoteViewer data={data}></NoteViewer>;
  },
  editor: (data, onUpdate, idx) => {
    return <NoteEditor data={data} onUpdate={onUpdate} idx={idx}></NoteEditor>;
  },
};
