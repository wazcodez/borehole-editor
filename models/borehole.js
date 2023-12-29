var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BoreholeSchema = new Schema({
  last_modified: Date,
  sync_status: Boolean,
  store: [Schema.Types.Mixed],
  borehole_title: String,
  borehole_id: String,
});

BoreholeSchema.pre("save", async function () {
  try {
    const Borehole = this.constructor;
    const boreholeExists = await Borehole.find({
      borehole_title: this.get("borehole_title"),
    })
      .lean()
      .exec();
  } catch (err) {
    throw new Error(`borehole exists - ${err}`);
  }
});

module.exports =
  mongoose.models.Borehole || mongoose.model("Borehole", BoreholeSchema);
