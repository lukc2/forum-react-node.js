const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");
const { check } = require('express-validator');

router.route("/ranks").get(categoryController.listRanks);
router.route("/").get(categoryController.listCategories);
router.route("/search").get(categoryController.searchThreads);
//READ
router.route("/:categoryId").get(categoryController.viewCategory);
router.route("/:categoryId/:threadId").get(categoryController.viewThread);
//ADD
router.route("/:categoryId/addThread").post([
    check("title").isLength({ min: 10 }).withMessage("Zakrótki tytuł wątku"),
    check("content").isLength({ min: 10 }).withMessage("Zakrótka treść wątku")
], categoryController.addThread);
router.route("/:categoryId/:threadId").post(
    check("content").isLength({ min: 5 }).withMessage("Zakrótka treść posta"),
    categoryController.addPost);
//VOTE
router.route("/:categoryId").put(categoryController.voteThread);
router.route("/:categoryId/:threadId").put(categoryController.votePost);
//CLOSE
router.route("/:categoryId").patch(categoryController.closeThread);
//DELETE
router.route("/:categoryId").delete(categoryController.deleteThread);
router.route("/:categoryId/:threadId").delete(categoryController.deletePost);
//EDIT
router.route("/:categoryId/:threadId").patch(categoryController.editPost);


module.exports = router;