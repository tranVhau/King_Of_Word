const { Categories } = require("../models");

const index = async (req, res) => {
  res.status(200).json("ok");
};

const show = async (req, res) => {};

const store = async (req, res) => {};

const destroy = async (req, res) => {};

const update = async (req, res) => {};

module.exports = { index, show, store, destroy, update };
