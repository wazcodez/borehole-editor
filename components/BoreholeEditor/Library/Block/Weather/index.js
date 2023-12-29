import WeatherEditor from "./WeatherEditor";
import WeatherViewer from "./WeatherViewer";
import Icon from "./../../../../common/Icon";
import Terms from "./../../../../../util/terms";

export default {
  type: "weather",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="sunny" />,
  multipleAllowed: false,
  schema: {
    type: "weather",
    level: Terms.Block.Level.Borehole,
    weather: "",
    temprature_title: "",
    temprature: "",
    temprature_unit: "deg C",
    notes: "",
    last_modified: "",
  },
  view: (data) => {
    return <WeatherViewer data={data}></WeatherViewer>;
  },
  editor: (data, onUpdate, idx) => {
    return (
      <WeatherEditor data={data} onUpdate={onUpdate} idx={idx}></WeatherEditor>
    );
  },
};
