const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  categories: { type: [mongoose.Schema.Types.ObjectId], ref: "Category" },
  price: { type: Number },
});

const Collections = mongoose.model("Collection", CollectionSchema);
module.exports = Collections;
