const path = require('path');
const fs = require('fs');
const databaseFilePath = path.join(__dirname, '..', 'data', 'database.json');
const bcrypt = require('bcrypt');

const renderProfile = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
    const user = users.find(user => user.id === req.user.id);
    res.render('profile/profile', { bodyClass: 'normal', user: user });
};

const updateProfile = async (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
    const user = users.find(user => user.id === req.user.id);
    user.name = req.body.name;
    user.email = req.body.email;
    if (req.body.password) {
        const saltRounds = 10;
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            user.password = hashedPassword;
        } catch (error) {
            // handle error
            console.error(error);
            return res.status(500).json({ message: 'Error hashing password' });
        }
    }
    fs.writeFileSync(databaseFilePath, JSON.stringify(users), 'utf8');
    res.redirect('/profile');
};

module.exports = { renderProfile, updateProfile };
