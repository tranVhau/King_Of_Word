const AuthRouter = require("./Auth.route");
const CollectionRouter = require("./Collection.route");
const PaymentRouter = require("./_Payment.route");
module.exports = (app) => {
  app.use("", [AuthRouter]);
  app.use("/client/api", [CollectionRouter, PaymentRouter]);
};
