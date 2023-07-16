const mongoose = require("mongoose");

const CollectionSchema = new mongoose.Schema({
  flashcards: { type: [mongoose.Schema.ObjectId], ref: "FlashCard" },
  contributor: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  categories: { type: [mongoose.Schema.Types.ObjectId], ref: "Category" },
  price: { type: Number },
});

const Collections = mongoose.model("Collection", CollectionSchema);
module.exports = Collections;
