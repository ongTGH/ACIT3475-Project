const express = require('express');
const app = express();
const session = require('express-session');
const ejsLayouts = require('express-ejs-layouts');
const passport = require('passport');
const petpalController = require('./controller/petpal-controller');
const path = require("path");
const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

// Routes start here
app.get('/', petpalController.index);
app.get('/login', petpalController.login);
app.get('/signup', petpalController.signup);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
