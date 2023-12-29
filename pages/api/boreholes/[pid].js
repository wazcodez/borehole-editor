import withConnect from "./../../../middleware/db";
import borehole from "./../../../models/borehole";
var Borehole = require("./../../../models/borehole");

const handler = async (req, res) => {
  const {
    query: { pid },
  } = req;

  if (req.method === "GET") {
    const boreholes = await Borehole.find({
      _id: pid,
    }).exec();
    return res.status(200).json({ data: boreholes });
  }

  if (req.method === "PUT") {
    let doc = await Borehole.findOneAndUpdate(
      { _id: pid },
      JSON.parse(req.body),
      {
        new: true,
      }
    );

    return res.status(200).json({ data: doc });
  }

  return res.status(500).json({});
};

export default withConnect(handler);
