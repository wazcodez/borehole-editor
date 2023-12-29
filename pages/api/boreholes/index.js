import withConnect from "./../../../middleware/db";
import borehole from "./../../../models/borehole";
var Borehole = require("./../../../models/borehole");

const handler = async (req, res) => {
  if (req.method === "GET") {
    const boreholes = await Borehole.find().exec();
    return res.status(200).json({ data: boreholes });
  }
  if (req.method === "POST") {
    const body = JSON.parse(req.body);
    const boreholes = await Borehole.create({
      last_modified: new Date(),
      sync_status: true,
      store: [],
      borehole_title: body.borehole_title,
      borehole_id: body.borehole_id,
    });
    return res.status(200).json({ data: boreholes });
  }
  if (req.method === "DELETE") {
    const body = JSON.parse(req.body);
    const boreholes = await Borehole.findOneAndDelete({
      borehole_title: body.borehole_title,
      borehole_id: body.borehole_id,
    });
    return res.status(200).json({ data: boreholes });
  }
  return res.status(404).json({});
};

export default withConnect(handler);
