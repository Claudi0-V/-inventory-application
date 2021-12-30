const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const verifyCallback = async (email, password, done) => {
  try {
    const user = User.findOne({ email });
    if (!user) return done(null, false);
    const isPasswordValid = await bcrypt.compare(password, user.salt);
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
