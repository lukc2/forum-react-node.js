const router = require("express").Router();
const apiRoutes = require("./api");

// Routy API
router.use("/api", apiRoutes);
module.exports = router;