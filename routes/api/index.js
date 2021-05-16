const router = require("express").Router();
const categoryRoutes = require("./categoryAPI");
const loginRoutes = require("./loginAPI.js");
const logoutRoutes = require("./logoutAPI");
const signInRoutes = require("./signInAPI");
const userPanelRoutes = require("./userPanelAPI");

router.use("/forum", categoryRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/signin", signInRoutes);
router.use("/userpanel", userPanelRoutes);

module.exports = router;