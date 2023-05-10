const database = require('./database.json');

const userErrCheck = (user) => {
    if (!user) throw new Error('User not found');
};

const userModel = {
    findAllUsers: () => {
        return database;
    },
    findById: (id) => {
        const user = database.find((user) => user.id.toLowerCase() === id.toLowerCase());
        userErrCheck(user);
        return user;
    },
    findByEmail: (email) => {
        const user = database.find((user) => user.email.toLowerCase() === email.toLowerCase());
        userErrCheck(user);
        return user;
    },
    searchUser: (search) => {
        return database.filter(
            (user) =>
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase())
        );
    },
};

module.exports = userModel;