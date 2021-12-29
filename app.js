const createError = require("http-errors");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo-session")(session);
const path = require("path");

const app = express();
const indexRouter = require("./routes/index");
const categoriesRouter = require("./routes/categories");
const itemsRouter = require("./routes/items");

require("dotenv").config();
const mongoose = require("mongoose");
const dbURI = process.env.DBURI;
const store = new MongoStore({ uri: dbURI, collection: "session" });

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("succes"))
  .catch((error) => console.log(error));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: store,
  })
);

app.use("/categories", categoriesRouter);
app.use("/items", itemsRouter);
app.use("/", indexRouter);

//in case of errors
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
