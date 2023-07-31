const mongoose = require("mongoose");

const PayPackageSchema = new mongoose.Schema({
  name: { type: String },
  extra: { type: Number },
  coin: { type: Number },
  price: { type: Number },
});

const PayPackages = mongoose.model("PayPackage", PayPackageSchema);
module.exports = PayPackages;
