const router = require("express").Router();
const categoryRoutes = require("./categoryAPI");
const loginRoutes = require("./loginAPI.js");
const logoutRoutes = require("./logoutAPI");
const signInRoutes = require("./signInAPI");

router.use("/forum", categoryRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/logout", signInRoutes);

module.exports = router;