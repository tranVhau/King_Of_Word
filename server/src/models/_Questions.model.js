const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: { type: String },
  answers: { type: [String] },
  correctIdx: { type: Number },
});

const Questions = mongoose.model("Question", QuestionSchema);
module.exports = Questions;
