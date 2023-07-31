const router = require("express").Router();
const QuestionController = require("../controllers/Question.controller");
const CategoryController = require("../controllers/Category.controller");
const FlashCardController = require("../controllers/FlashCard.controller");
const CollectionController = require("../controllers/Collection.controller");
const {
  isAuthenticated,
} = require("../middlewares/IsAuthenticated.middleware");

router.get("/collections", isAuthenticated, CollectionController.index);
router.get("/collection/:id", CollectionController.show);
router.post("/collection/store", CollectionController.store);
router.delete("/collection/delete/:id", CollectionController.destroy);
router.put("/collection", CollectionController.update);

// flash Card
router.get("/flashcards", FlashCardController.index);
router.post("/flashcard/store", FlashCardController.store);
router.delete("/flashcard/delete/:id", FlashCardController.destroy);
router.put("/flashcard", FlashCardController.update);

// Category
router.get("/categories", CategoryController.index);
router.get("/category/:id", CategoryController.show);
router.post("/category/store", CategoryController.store);
router.delete("/category/delete/:id", CategoryController.destroy);
router.put("/category", CategoryController.update);

//Question
router.get("/question/:id", QuestionController.show);
router.post("/question/store", QuestionController.store);
router.delete("/question/delete/:id", QuestionController.destroy);
router.put("/question", QuestionController.update);

module.exports = router;
