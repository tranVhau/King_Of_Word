const router = require("express").Router();
const QuestionController = require("../controllers/Question.controller");
const CategoryController = require("../controllers/Category.controller");
const FlashCardController = require("../controllers/FlashCard.controller");
const CollectionController = require("../controllers/Collection.controller");
const {
  isAuthenticated,
} = require("../middlewares/IsAuthenticated.middleware");

// router.get("/collections", isAuthenticated, CollectionController.index);
router.get("/collections", isAuthenticated, CollectionController.index);

router.get("/collection/:id", CollectionController.show);
router.post("/collection/store", isAuthenticated, CollectionController.store);
router.delete(
  "/collection/delete/:id",
  isAuthenticated,
  CollectionController.destroy
);
router.put("/collection", isAuthenticated, CollectionController.update);

// flash Card
router.get("/flashcards", FlashCardController.index);
router.post("/flashcard/store", isAuthenticated, FlashCardController.store);
router.delete(
  "/flashcard/delete/:id",
  isAuthenticated,
  FlashCardController.destroy
);
router.put("/flashcard", isAuthenticated, FlashCardController.update);

// Category
router.get("/categories", isAuthenticated, CategoryController.index);
router.get("/category/:id", isAuthenticated, CategoryController.show);
router.post("/category/store", isAuthenticated, CategoryController.store);
router.delete(
  "/category/delete/:id",
  isAuthenticated,
  CategoryController.destroy
);
router.put("/category", isAuthenticated, CategoryController.update);

//Question
router.get("/question/:id", QuestionController.show);
router.post("/question/store", QuestionController.store);
router.delete("/question/delete/:id", QuestionController.destroy);
router.put("/question", QuestionController.update);

module.exports = router;
