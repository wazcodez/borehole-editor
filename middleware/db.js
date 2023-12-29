import mongoose from "mongoose";

const withConnect = (handler) => async (req, res) => {
  if (!mongoose.connection.readyState) {
    const uri = `${process.env.DB_URI}`;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      autoIndex: false,
    });
  }
  return handler(req, res);
};

export default withConnect;
