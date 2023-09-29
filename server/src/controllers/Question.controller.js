const { Questions } = require("../models");

const index = async (req, res) => {
  const page = req.query.page > 0 ? req.query.page : 1;
  const limit = Number(req.query.limit) || 10;

  try {
    const questions = await Questions.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Questions.count({});
    const pagination = {
      page: page,
      total: Math.ceil(total / limit),
    };
    res.status(200).json({ data: questions, pagination: pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const show = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).json({ message: "bad request" });
    const question = await Questions.findById(id);
    res.status(200).json({ data: question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const store = async (req, res) => {
  const { answers, question, correctIdx } = req.body;
  try {
    if (answers?.length != 4 || !question || correctIdx > 3 || correctIdx < 0) {
      return res.status(400).json({ message: "bad request" });
    }

    const newQuestion = new Questions({
      answers: answers,
      question: question,
      correctIdx: correctIdx,
    });

    await newQuestion.save();
    res
      .status(201)
      .json({ data: newQuestion, message: "new question added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const targetQuestion = await Questions.findByIdAndDelete(id);
    if (targetQuestion) {
      res.status(201).json({
        data: targetQuestion,
        message: "question deleted successfully",
      });
    } else {
      res.status(404).json({ message: "question not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { answers, question, correctIdx } = req.body;
  try {
    if (
      !id ||
      answers?.length != 4 ||
      !question ||
      correctIdx > 3 ||
      correctIdx < 0
    ) {
      res.status(400).json({ message: "bad request" });
    } else {
      const targetQuestion = await Questions.findByIdAndUpdate(
        id,
        { answers: answers, question: question, correctIdx: correctIdx },
        { new: true }
      );

      if (targetQuestion) {
        res.status(201).json({
          data: targetQuestion,
          message: "question updated successfully",
        });
      } else {
        res.status(404).json({ message: "question not found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, store, show, destroy, update };
