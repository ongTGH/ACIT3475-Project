const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/auth-controller").authController;

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

module.exports = passport.use(localLogin);