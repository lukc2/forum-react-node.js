const router = require("express").Router();
const adminPanelController = require("../../controllers/adminPanelController");

router.route("/").get(adminPanelController.listUsers)
router.route("/").put(adminPanelController.makeMod)
router.route("/").delete(adminPanelController.banUser)
router.route("/").post(adminPanelController.addCategory)



module.exports = router;