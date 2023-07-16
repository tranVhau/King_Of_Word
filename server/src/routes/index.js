const AuthRouter = require("./Auth.route");
const CollectionRouter = require("./Collection.route");
module.exports = (app) => {
  app.use("", [AuthRouter]);
  app.use("/client/api", [CollectionRouter]);
};
