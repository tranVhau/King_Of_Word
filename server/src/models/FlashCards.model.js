const mongoose = require("mongoose");

const FlashCardSchema = new mongoose.Schema({
  collectionID: { type: mongoose.Schema.ObjectId, ref: "Collection" },
  front: { type: String },
  back: { type: String },
});

const FlashCards = mongoose.model("FlashCard", FlashCardSchema);
module.exports = FlashCards;
