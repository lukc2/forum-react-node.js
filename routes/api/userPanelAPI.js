const router = require("express").Router();
const userPanelController = require("../../controllers/userPanelController");
const { check } = require('express-validator');

router.route("/").get(userPanelController.getUserPanel)
router.route("/").post(userPanelController.updateUserData)
router.route("/").put([check("password").isLength({ min: 6 }).withMessage("Hasło za krótkie")],userPanelController.updatePassword)
router.route("/").patch(userPanelController.updateFooter)
router.route("/avatar").post(userPanelController.updateAvatar)
router.route("/").delete(userPanelController.deleteUser)


module.exports = router;