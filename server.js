const express = require("express");
const path = require("path");
// const expressSession = require('express-session');
// const expressValidator = require("express-validator");
// const session = require("express-session");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

const app = express();
<<<<<<< HEAD

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TODO: routes
//TODO: model
//TODO: controller
//TODO: middleware
//please make folders and dedicated files


if (process.env.NODE_ENV === "production") {
	app.get('/', (req, res) => {
		res.send('Hello World!');
	});
	// app.use(express.static(path.resolve(__dirname, "client", "build")));
	// app.get("*", (req, res) => {
	// 	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	// });
}

=======
app.get("*", (req, res) => {
	app.use(express.static(path.resolve(__dirname, "client", "build")));
	res.send("hello world");
});
>>>>>>> parent of b83e895 (fixed small errors +TODO)
app.listen(PORT, console.log(`http://${HOST}:${PORT}`));

