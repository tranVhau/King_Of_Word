const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
  collections: { type: [mongoose.Schema.Types.ObjectId], ref: "Collection" },
});

const Categories = mongoose.model("Category", CategorySchema);
module.exports = Categories;
