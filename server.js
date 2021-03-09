const express = require("express");
const path = require("path");
// const expressSession = require('express-session');
// const expressValidator = require("express-validator");
// const session = require("express-session");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

const app = express();
app.get("*", (req, res) => {
	app.use(express.static(path.resolve(__dirname, "client", "build")));
	res.send("hello world");
});
app.listen(PORT, console.log(`http://${HOST}:${PORT}`));
