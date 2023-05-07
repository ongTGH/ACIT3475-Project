const database = require('./database.json');

const errCheck = (user) => {
    if (!user) throw new Error('User not found');
};

const userModel = {
    getAllUsers: () => {
        return database;
    },
    getUserById: (id) => {
        const user = database.find((user) => user.id === id);
        errCheck(user);
        return JSON.stringify(user, null, 4);
    },
    getUserByEmail: (email) => {
        const user = database.find((user) => user.email === email);
        errCheck(user);
        return JSON.stringify(user, null, 4);
    },
    searchUser: (search) => {
        return database.filter(
            (user) =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())
        );
    },
};

module.exports = userModel;