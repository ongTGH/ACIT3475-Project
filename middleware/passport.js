const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userController = require("../controller/auth-controller").authController;
const GOOGLE_CLIENT_ID = "781982273949-fss8oovtdto1pschqnl8q0ojb1k5toc2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const localLogin = new LocalStrategy({
    usernameField: "email", passwordField: "password"
}, (email, password, done) => {
    let user = userController.getUserByEmailIdAndPassword(email, password);
    if (user) {
        done(null, user);
    } else {
        done(null, false, { message: "Invalid email or password" });
    }
});

const googleLogin = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/appt"
},
    (accessToken, refreshToken, profile, cb) => {
        return done(err, profile);
    }
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    let user = userController.getUserById(id);
    if (user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin), passport.use(googleLogin);