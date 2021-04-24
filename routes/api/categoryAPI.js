const router = require("express").Router();
const categoryController = require("../../controllers/categoryController");
const { check } = require('express-validator');

router.route("/:categoryId").get(categoryController.viewCategory);
router.route("/:categoryId/:threadId").get(categoryController.viewThread);
router.route("/:categoryId/addThread").post([
    check("title").isLength({ min: 10 }).withMessage("Zakrótki tytuł wątku"),
    check("content").isLength({ min: 10 }).withMessage("Zakrótka treść wątku")
], categoryController.addThread);
router.route("/:categoryId/:threadId").post(check("content").isLength({ min: 5 }).withMessage("Zakrótka treść posta"), categoryController.addPost);


module.exports = router;