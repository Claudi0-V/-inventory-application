const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const verifyCallback = async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return done(null, false);
    const isPasswordValid = await bcrypt.compare(password, user.salt);
    console.log(isPasswordValid, password)
    if (isPasswordValid) return done(null, user);
    return done(null, false);
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
