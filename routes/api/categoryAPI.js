const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");

router.route("/:categoryId").get(categoryController.viewCategory);
router.route("/:categoryId/:threadId").get(categoryController.viewThread);

module.exports = router;