const router = require("express").Router();
const { index } = require("../controllers/Collection.controller");
const {
  isAuthenticated,
} = require("../middlewares/IsAuthenticated.middleware");

router.get("/collections", index);

module.exports = router;
