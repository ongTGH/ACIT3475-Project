const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const data = require('../data/database.json');
const passport = require('passport');

// Render the sign in page
const renderSignIn = (req, res, next) => {
    res.render('auth/signin', { bodyClass: 'index' });
};

// Render the sign up page
const renderSignUp = (req, res, next) => {
    res.render('auth/signup', { bodyClass: 'index' });
};

// Create a new user    
const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            pets: [],
        };
        data.push(user);
        fs.writeFileSync(path.join(__dirname, '../data/database.json'), JSON.stringify(data, null, 2));
        res.redirect('/signin');
    } catch (error) {
        res.redirect('/signup');
    }
};

// Sign in a user (local strategy)
const signInUser = (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('/signin');
        }
        const sessionFilePath = path.join(__dirname, '../sessions', req.sessionID + '.json');
        fs.writeFileSync(sessionFilePath, JSON.stringify(req.session));

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.redirect('/appointments');
        });
    })(req, res, next);
};


// Logout a user
const logoutUser = (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/signin');
        });
    } else {
        res.redirect('/signin');
    }
};


module.exports = { createUser, logoutUser, signInUser, renderSignIn, renderSignUp };