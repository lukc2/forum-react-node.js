const router = require("express").Router();
const signInController = require("../../controllers/signInController");
const { check } = require('express-validator');

router.route("/").post([
    check("login").isLength({ min: 4 }).withMessage("Login za krótka"),
    check("name").isLength({ min: 4 }).withMessage("Nazwa za krótka"),
    check("password").isLength({ min: 6 }).withMessage("Hasło za krótkie"),
    check("email").isEmail().withMessage("Nieprawidłowy adres email")
], signInController.register);

module.exports = router;