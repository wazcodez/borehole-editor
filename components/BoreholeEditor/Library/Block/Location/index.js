import LocationEditor from "./LocationEditor";
import LocationViewer from "./LocationViewer";
import Icon from "./../../../../common/Icon";
import Terms from "./../../../../../util/terms";

export default {
  type: "location",
  level: Terms.Block.Level.Borehole,
  icon: <Icon name="location" />,
  multipleAllowed: false,
  schema: {
    type: "location",
    level: Terms.Block.Level.Borehole,
    street: "",
    city: "",
    province: "",
    postal: "",
    latitude: "",
    longitude: "",
    northing: "",
    easting: "",
    zone: "",
    gps_unit: "utm",
    depth_unit: "m",
    access_information: "",
  },
  view: (data) => {
    return <LocationViewer data={data}></LocationViewer>;
  },
  editor: (data, onUpdate, idx) => {
    return (
      <LocationEditor
        data={data}
        onUpdate={onUpdate}
        idx={idx}
      ></LocationEditor>
    );
  },
};
