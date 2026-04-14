const express = require("express");
const path = require("path");
const { Pool } = require("pg");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = new Pool({
  host: "localhost",
  user: "rohit",
  password: "232959",
  database: "auth_practice",
  port: "5432",
});

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index"));

app.get("/sign-up", (req, res) => res.render("sign-up-form"));

app.post("/sign-up", async (req, res, next) => {
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, req.body.password]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    throw err;
  }
  console.log("Running...");
});
