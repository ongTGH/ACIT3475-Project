const bcrypt = require('bcrypt');
const database = require('./database.json');

const isUserValid = async (user, password) => {
    return user ? await bcrypt.compare(password, user.password) : false;
};

const userModel = {
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        return user || null;
    },
    findByEmail: (email) => {
        const user = database.find((user) => user.email === email);
        return user || null;
    },
    getUserByEmailIdAndPassword: async (email, password) => {
        let user = userModel.findByEmail(email);
        if (user && await isUserValid(user, password)) {
            return user;
        }
        return null;
    },
};

module.exports = userModel;
