const { FlashCards } = require("../models");

const index = async (req, res) => {
  res.status(200).json("ok");
};

const store = async (req, res) => {
  try {
    if (!req.body.front || !req.body.back || !req.body.collectionID) {
      res.status(400).json({ data: "the request data is required" });
    }
    const flashCard = new FlashCards({
      front: req.body.front,
      back: req.body.back,
      collectionID: req.body.collectionID,
    });

    await flashCard.save();
    res.status(201).json({ data: flashCard });
  } catch (error) {
    res.status(500).json({ error: error._message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ data: "the request data is required" });
    }
    const flashCard = await FlashCards.findByIdAndDelete(id);
    if (flashCard) {
      res.status(201).json({ data: flashCard, message: "flashcard deleted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error._message });
  }
};

const update = async (req, res) => {};

module.exports = { index, store, destroy, update };
