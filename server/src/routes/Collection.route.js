const router = require("express").Router();
const QuestionController = require("../controllers/Question.controller");
const CategoryController = require("../controllers/Category.controller");
const FlashCardController = require("../controllers/FlashCard.controller");
const CollectionController = require("../controllers/Collection.controller");
const {
  isAuthenticated,
  isAdmin,
} = require("../middlewares/IsAuthenticated.middleware");

// router.get("/collections", isAuthenticated, CollectionController.index);
router.get("/collections", isAuthenticated, CollectionController.index);
router.get("/collection/:id", CollectionController.show);
router.post(
  "/collection/store",
  isAdmin,
  isAuthenticated,
  CollectionController.store
);
// router.post("/collection/store", CollectionController.store);

router.delete(
  "/collection/delete/:id",
  isAuthenticated,
  isAdmin,
  CollectionController.destroy
);
router.put(
  "/collection/update/:id",
  isAuthenticated,
  isAdmin,
  CollectionController.update
);

// flash Card
router.post("/flashcard/store", isAuthenticated, FlashCardController.store);
router.delete(
  "/flashcard/delete/:id",
  isAuthenticated,
  isAdmin,
  FlashCardController.destroy
);
router.put(
  "/flashcard/update/:id",
  isAuthenticated,
  isAdmin,
  FlashCardController.update
);

// Category
router.get("/categories", isAuthenticated, CategoryController.index);
router.get("/category/:id", isAuthenticated, CategoryController.show);
router.post(
  "/category/store",
  isAuthenticated,
  isAdmin,
  CategoryController.store
);
router.delete(
  "/category/delete/:id",
  isAuthenticated,
  isAdmin,
  CategoryController.destroy
);
router.put(
  "/category/update/:id",
  isAuthenticated,
  isAdmin,
  CategoryController.update
);

//Question
router.get("/questions", QuestionController.index);
router.get("/question/:id", QuestionController.show);
router.post(
  "/question/store",
  isAuthenticated,
  isAdmin,
  QuestionController.store
);
router.delete(
  "/question/delete/:id",
  isAuthenticated,
  isAdmin,
  QuestionController.destroy
);
router.put(
  "/question/update/:id",
  isAuthenticated,
  isAdmin,
  QuestionController.update
);

module.exports = router;
