const { FlashCards } = require("../models");

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

const update = async (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;
  try {
    if (!id || !front || !back) {
      return res.status(400).json({ message: "bad request" });
    }
    const update = { front: front, back: back };
    const editedFlashcard = await FlashCards.findByIdAndUpdate(id, update, {
      new: true,
    });
    if (editedFlashcard) {
      res.status.json({
        data: editedFlashcard,
        message: "flashcard updated successfully",
      });
    } else {
      res.status.json({
        message: "flashcard not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { store, destroy, update };
