const mongoose = require("mongoose");
const { Accounts, PaymentHistories, PayPackages } = require("../models");
const PayPal = require("../services/paypal");

const purchaseCollection = async (req, res) => {
  const session = await mongoose.startSession();
  const { user_id, collection_id, collection_price } = req.body;
  try {
    session.startTransaction();
    const currUser = await Accounts.findById(user_id);
    currUser.owned.push(collection_id);
    currUser.balance -= collection_price;
    await currUser.save();
    await PaymentHistories.create({
      user_id: user_id,
      collection_id: collection_id,
      coin_change: -collection_price,
    });

    res.status(200).json({ message: "Collection purchased successfully" });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ error: error });
  }
  session.endSession();
};

const purchasePackage = async (
  user_id,
  transaction_id,
  coin_change,
  package_id
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //update balance
    await Accounts.findOneAndUpdate(
      { _id: user_id },
      { $inc: { balance: coin_change } }
    );
    //create payment history
    const payment_log = new PaymentHistories({
      user_id: user_id,
      transaction_id: transaction_id,
      package_id: package_id,
      coin_change: coin_change,
    });

    await payment_log.save();

    // res.status(200).json({ message: "Package purchased successfully" });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    // res.status(500).json({ error: error });
  }
  session.endSession();
};

const getPriceList = async (req, res) => {
  try {
    const data = await PayPackages.find();
    res.status(200).json({ data: data });
  } catch (error) {
    res.status(500).json(error);
  }
};

// for paypal payment:
const createOrders = async (req, res) => {
  const order = req.body;
  try {
    const response = await PayPal.createOrder(order);
    res.json(response);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

const captureOrder = async (req, res) => {
  try {
    const order = req.body;
    const coin_change = order.coin + order.extra;
    const { orderID } = req.params;
    const response = await PayPal.capturePayment(orderID);
    await purchasePackage(order.user_id, "123", coin_change, order._id);

    res.json(response);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};

module.exports = {
  purchaseCollection,
  getPriceList,
  createOrders,
  captureOrder,
  purchasePackage,
};
