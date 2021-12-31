module.exports = (req, res, next) => {
  if (req.isAuthenticated()){
        res.locals.isAuth = true;
  next()
  }
  else {
    res.status(401).redirect("/user/login");
  }
}

