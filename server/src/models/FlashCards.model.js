const mongoose = require("mongoose");

const FlashCardSchema = new mongoose.Schema({
  front: { type: String },
  back: { type: String },
});

const FlashCards = mongoose.model("FlashCard", FlashCardSchema);
module.exports = FlashCards;
