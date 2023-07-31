const { Accounts, Collections, PayPackages } = require("../models");
const isValidPurchase = async (req, res, next) => {
  const { collection_id, user_id } = req.body;
  try {
    if (!collection_id || !user_id) {
      return res.status(400).json({ message: "data request is missing" });
    }
    const currUser = await Accounts.findById(user_id);
    if (!currUser) {
      return res.status(400).json({ message: "Invalid user" });
    }
    // check the collection has been purchased or not
    const isPurchased = currUser.owned.some(
      (collection) => collection == collection_id
    );
    if (isPurchased) {
      return res.status(400).json({ message: "The collection has been owned" });
    }
    // if not owned, check collection valid or not
    const targetCollection = await Collections.findById(collection_id);
    if (!targetCollection) {
      return res.status(400).json({ message: "Invalid Collection" });
    }
    if (currUser.balance < targetCollection.price) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    req.body.collection_price = targetCollection.price;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const isValidTransaction = async (req, res, next) => {
  const { user_id, _id: package_id } = req.body;
  try {
    if (!user_id || !package_id) {
      return res.status(400).json({ message: "data request is missing" });
    }
    const targetUser = await Accounts.findById(user_id);
    const targetPackage = await PayPackages.findById(package_id);
    if (!targetUser) {
      return res.status(404).json({ message: "Invalid user " });
    }
    if (!targetPackage) {
      return res.status(404).json({ message: "Invalid Package" });
    }
    req.coins = targetPackage.coin + targetPackage.extra;
    req.package_id = package_id;
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = { isValidTransaction, isValidPurchase };
