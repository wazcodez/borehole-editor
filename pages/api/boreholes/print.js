import withConnect from "./../../../middleware/db";
import borehole from "./../../../models/borehole";
var Borehole = require("./../../../models/borehole");

const PDFDocument = require("pdfkit");

const border = (doc, dx_margin, dy_margin) => {
  doc
    .rect(dx_margin, dy_margin, 612 - 2 * dx_margin, 792 - 2 * dy_margin)
    .lineWidth(0.2)
    .stroke();
};

const footerLine = (doc, dx_margin) => {
  let current_x = dx_margin;
  let current_y = 792 - 36;

  doc
    .moveTo(current_x, current_y)
    .lineTo(612 - 1 * current_x, current_y)
    .stroke();
};

const writeHeader = (doc, dx_margin, dy_margin, borehole_id = "XXX") => {
  let current_x = dx_margin;
  let current_y = dy_margin;
  const title_text = `RECORD OF BOREHOLE - ${borehole_id}`;

  const left_cols = [
    "PROJECT: Hamilton Wells (#12344)",
    "LOCATION: N 4,836,002  E 297,595",
    "STARTED:  12th June, 2020",
    "ENDED: 12th June, 2020",
  ];

  doc.font("Times-Bold");
  doc.fontSize(14);
  current_y = current_y + 5;
  doc.text(title_text, current_x, current_y, {
    ellipsis: true,
    align: "center",
  });

  doc.font("Times-Roman");
  doc.fontSize(10);
  current_y = current_y + 18;
  current_x = current_x + 8;
  for (let index = 0; index < left_cols.length; index++) {
    const element = left_cols[index];
    doc.text(element, current_x, current_y, {
      width: 200,
      ellipsis: true,
    });
    current_y = current_y + 12;
  }

  current_y = current_y + 10;
  doc
    .moveTo(dx_margin, current_y)
    .lineTo(612 - 1 * dx_margin, current_y)
    .stroke();
};

const writeFileInfo = (
  doc,
  dx_margin,
  dy_margin,
  borehole_title,
  borehole_id,
  pid
) => {
  const angle = -90;
  doc.fontSize(9);
  doc.rotate(angle, { origin: [0, 0] });
  doc.text(
    `${borehole_title.toUpperCase()}:${borehole_id.toUpperCase()}, VERSION:${pid}, DRAFT`,
    dx_margin - 792,
    dy_margin - 9
  );
  doc.rotate(angle * -1, { origin: [0, 0] });
};

const writeFooter = (doc, dx_margin, dy_margin, borehole_id = "XXX") => {
  footerLine(doc, dx_margin);

  let current_x = dx_margin;
  let current_y = 792 - 36;
  current_y = current_y + 5;
  doc.font("Times-Roman");
  doc.fontSize(10);

  doc.text("Page 1 of 1", 612 - 1 * current_x - 55, current_y, {
    width: 200,
    ellipsis: true,
  });
};

const handler = async (req, res) => {
  const {
    query: { pid },
  } = req;
  console.log("pid", pid);
  const boreholes = await Borehole.find({
    _id: pid,
  }).exec();
  const borehole = boreholes[0];
  const dy_margin = 16;
  const dx_margin = 16;
  let doc = new PDFDocument({
    margins: {
      top: dy_margin,
      bottom: dy_margin,
      left: dx_margin,
      right: dx_margin,
    },
    layout: "portrait", // can be 'landscape'
    info: {
      Title: borehole.borehole_title,
      Author: "author", // the name of the author
      Subject: "",
    },
  });

  doc.pipe(res);
  border(doc, dx_margin, dy_margin);
  writeHeader(doc, dx_margin, dy_margin, borehole.borehole_id);
  writeFooter(doc, dx_margin, dy_margin, borehole.borehole_id);
  writeFileInfo(
    doc,
    dx_margin,
    dy_margin,
    borehole.borehole_title,
    borehole.borehole_id,
    pid
  );
  doc.end();

  return res;
};

export default withConnect(handler);
