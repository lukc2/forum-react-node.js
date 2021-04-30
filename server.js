const express = require("express");
const expressSession = require('express-session');
const session = require("express-session");
const SequelizeStore=require('connect-session-sequelize')(session.Store);
const routes = require("./routes");

require("dotenv").config();
const db = require("./config/database");

const path = require("path");

 //do testów lokalnych
/* aby działało testowanie lokalne należy stworzyć plik .env o zawartości
	NODE_ENV=production
	możemy tam przechowywać dane ukryte(np. link do bazy)
*/
// const expressSession = require('express-session');
// const expressValidator = require("express-validator");
// const session = require("express-session");

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());






//setting up session
const sessionStore= new SequelizeStore({
    db: db.sequelize
})
app.use(expressSession({
    secret: 'itssessionkey',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
    
}))

sessionStore.sync();

//TODO: API - częściowo jest
//TODO: model - są
//TODO: controller - jeden jest
//TODO: middleware - ni mo
//please make folders and dedicated files
app.use(routes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}



app.listen(PORT, console.log(`${HOST}:${PORT}`));