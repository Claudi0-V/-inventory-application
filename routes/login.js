const express = require("express");
const router = express.Router();
const isAuth = require("../configs/authMiddleware.js")
const passport = require('passport');



router.get("/login",  (req, res) => {
  res.render("login", {title: "Login Page"});
})

router.post("/login", passport.authenticate('local'), (req, res) => {
  console.log(req)
  console.log("-------------------------")
  console.log(res)
})

module.exports = router
