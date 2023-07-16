const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String },
});

const Categories = mongoose.model("Category", CategorySchema);
module.exports = Categories;
