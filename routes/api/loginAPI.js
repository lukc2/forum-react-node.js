const router = require("express").Router();
const loginController = require("../../controllers/loginController.js");
const { check } = require('express-validator');

router.post('/', [
    check('login').isLength({ min: 4 }).withMessage("Login za krotkie"),
    check('password').isLength({ min: 6 }).withMessage("Hasło za krotkie")
],loginController.login)

module.exports = router;