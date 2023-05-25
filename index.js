const express = require('express');
const session = require('express-session');
const FSStore = require('connect-fs2')(session);
const ejsLayouts = require('express-ejs-layouts');
const path = require("path");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// environment variables
const PORT = process.env.PORT || 3000;
const sessionPath = path.join(__dirname, 'sessions');
const options = { dir: sessionPath };
require('./middleware/passport');

// router imports
const authRouter = require('./routes/auth-route');
const homepageRouter = require('./routes/homepage-route');
const apptRouter = require('./routes/appt-route');
const petRouter = require('./routes/pet-route');

// create express app
const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(ejsLayouts);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: new FSStore(options),
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(homepageRouter);
app.use(authRouter);
app.use(apptRouter);
app.use(petRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
