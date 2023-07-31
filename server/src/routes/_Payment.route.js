const router = require("express").Router();
const PaymentController = require("../controllers/Payment.controller");
const {
  isAuthenticated,
} = require("../middlewares/IsAuthenticated.middleware");
const {
  isValidTransaction,
  isValidPurchase,
} = require("../middlewares/Purchase.middlerware");

//Payment

//for exchange coins to collection
router.post(
  "/collection/payment",
  isAuthenticated,
  isValidPurchase,
  PaymentController.purchaseCollection
);

// for Handler payment transaction
router.post(
  "/package/payment",
  isAuthenticated,
  isValidTransaction,
  PaymentController.purchasePackage
);
router.get("/price-list", PaymentController.getPriceList);

// for handler paypal payment
router.post("/orders", isValidTransaction, PaymentController.createOrders);
router.post("/orders/:orderID/capture", PaymentController.captureOrder);

module.exports = router;
