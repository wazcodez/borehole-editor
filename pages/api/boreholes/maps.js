import withConnect from "./../../../middleware/db";
var Borehole = require("./../../../models/borehole");

const boreholesWithLocationsQuery = [
  {
    $unwind: {
      path: "$store",
    },
  },
  {
    $match: {
      $and: [
        {
          "store.data.latitude": {
            $ne: "",
            $exists: true,
          },
        },
        {
          "store.data.longitude": {
            $ne: "",
            $exists: true,
          },
        },
      ],
    },
  },
  {
    $project: {
      _id: 0,
      type: "Feature",
      properties: {
        uid: "$_id",
        id: "$borehole_id",
        name: "$borehole_title",
      },
      geometry: {
        type: "Point",
        coordinates: ["$store.data.longitude", "$store.data.latitude"],
      },
    },
  },
];


const handler = async (req, res) => {
  if (req.method === "GET") {
    const boreholes = await Borehole.aggregate(
      boreholesWithLocationsQuery
    ).exec();

    const boreholeWithoutLocationsData = await Borehole.find({
      "$or": [
        {
          "$and": [
            {'store.data.latitude': {'$eq': ''}},
            {'store.data.longitude': {'$eq': ''}}
          ]
        },
        {'store.data.latitude': {$exists: false}},
        {'store.data.longitude': {$exists: false}}
      ]
    });

    const boreholeWithoutLocations = boreholeWithoutLocationsData.map((d) => {return {uid: d._id, 'name': d.borehole_title}});

    return res.status(200).json({
      locations_missing: boreholeWithoutLocations,
      locations: { type: "FeatureCollection", features: boreholes },
    });
  }
  return res.status(500).json({});
};

export default withConnect(handler);
