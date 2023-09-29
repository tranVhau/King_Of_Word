const { Accounts } = require("../models");

const isAuthenticated = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "unauthenticated" });
  }
  req.userID = req._id;
  next();
};

const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "unauthenticated" });
  } else {
    const currUser = await Accounts.find({ _id: req.user._id });
    if (!currUser[0].isAdmin) {
      return res.status(403).json({ message: "Permission required" });
    }
  }
  res.userID = req._id;
  next();
};

module.exports = { isAuthenticated, isAdmin };
