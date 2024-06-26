const mongoose = require("mongoose");

var mongoURL = mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB connection unsuccessful");
});

connection.on("connected", () => {
  console.log("Mongo DB connection successful");
});

module.exports = mongoose;
