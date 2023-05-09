const database = require('./database.json');

const userErrCheck = (user) => {
    if (!user) throw new Error('User not found');
};

const petErrCheck = (pet) => {
    if (!pet) throw new Error('Pet not found');
};

const userModel = {
    getAllUsers: () => {
        return database;
    },
    getUserById: (id) => {
        const user = database.find((user) => user.id.toLowerCase() === id.toLowerCase());
        userErrCheck(user);
        return user;
    },
    getUserByEmail: (email) => {
        const user = database.find((user) => user.email.toLowerCase() === email.toLowerCase());
        userErrCheck(user);
        return user;
    },
    getUserByFirstName: (firstName) => {
        const user = database.find((user) => user.firstName.toLowerCase() === firstName.toLowerCase());
        userErrCheck(user);
        return user;
    },
    getUserByLastName: (lastName) => {
        const user = database.find((user) => user.lastName.toLowerCase() === lastName.toLowerCase());
        userErrCheck(user);
        return user;
    },
    getUserPet: (id, petName) => {
        const user = database.find((user) => user.id === id);
        userErrCheck(user);
        const pet = user.pets.find((pet) => pet.petName.toLowerCase() === petName.toLowerCase());
        petErrCheck(pet);
        return pet;

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