const mongoose = require("mongoose");

const AccountSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String },
  email: { type: String },
  photo: { type: String },
  owned: { type: [mongoose.Schema.Types.ObjectId], ref: "Collection" },
  balance: { type: Number },
});

const Accounts = mongoose.model("Account", AccountSchema);
module.exports = Accounts;
