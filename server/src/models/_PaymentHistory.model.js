const mongoose = require("mongoose");

const PaymentHistoryScheme = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId },
  transaction_id: { type: String },
  package_id: { type: mongoose.Schema.Types.ObjectId },
  collection_id: { type: mongoose.Schema.Types.ObjectId },
  coin_change: { type: Number },
});

const PaymentHistories = mongoose.model("PaymentLog", PaymentHistoryScheme);

module.exports = PaymentHistories;
