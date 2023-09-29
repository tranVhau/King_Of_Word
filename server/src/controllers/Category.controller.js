const { Categories } = require("../models");

const index = async (req, res) => {
  const page = req.query.page > 0 ? req.query.page : 1;
  const limit = Number(req.query.limit) || 8;
  try {
    const categories = await Categories.find({})
      .select("_id name")
      .skip((page - 1) * limit)
      .limit(limit);
    const total = await Categories.count({});
    const pagination = {
      page: page,
      total: Math.ceil(total / limit),
    };
    res.status(200).json({ data: categories, pagination: pagination });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).json({ message: "bad request" });
    const category = await Categories.findById(id).select("_id name");
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const store = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) res.status(400).json({ message: "category name is required" });
    const category = new Categories({ name: name });
    await category.save();
    res
      .status(201)
      .json({ data: category, message: "new category added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) res.status(400).json({ message: "id field is required" });
    const targetCategory = await Categories.findByIdAndDelete(id);
    if (targetCategory) {
      res.status(201).json({
        data: targetCategory,
        message: "category deleted successfully",
      });
    } else {
      res.status(404).json({
        message: "category not found",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    if (!id || !name) res.status(400).json({ message: "bad request" });
    const targetCategory = await Categories.findByIdAndUpdate(
      id,
      { name: name },
      { new: true }
    );

    if (targetCategory) {
      res.status(201).json({
        data: targetCategory,
        message: "category updated successfully",
      });
    } else {
      res.status(404).json({ message: "category not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { index, show, store, destroy, update };
