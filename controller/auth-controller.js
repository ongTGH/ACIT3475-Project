const userModel = require("../database/user-model");

const isUserValid = (user, password) => {
    return user.password === password;
};

let authController = {
    getUserByEmailIdAndPassword: (email, password) => {
        let user = userModel.findByEmail(email);
        if (user && isUserValid(user, password)) {
            return user;
        }
        return null;
    },
    getUserById: (id) => {
        let user = userModel.findById(id);
        if (user) {
            return user;
        }
        return null;
    }

};

module.exports = { authController };