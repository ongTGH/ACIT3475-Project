const path = require('path');
const fs = require('fs').promises;
const databaseFilePath = path.join(__dirname, '..', 'data', 'database.json');

const renderPetView = (req, res, next) => {
    const user = req.user;
    const pets = user.pets || [];
    res.render('pets/pet-view', { bodyClass: 'normal', pets, activeLink: 'pets', user: req.user });
};

const renderAddPetPage = async (req, res, next) => {
    try {
        const usersData = await fs.readFile(databaseFilePath, 'utf8');
        const users = JSON.parse(usersData);
        const userId = req.user.id;
        const user = users.find((user) => user.id === userId);
        const pets = user.pets;
        res.render('pets/add-pet', { bodyClass: 'normal', user, pets });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error reading data from the database');
    }
};

const postAddPet = async (req, res, next) => {
    const {
        name,
        type,
        breed,
        age,
        sex,
        neutered,
        weight,
        'health-history': healthHistory,
        behavior,
        diet,
        exercise,
        grooming,
        microchip,
        insurance,
        'emergency-contact': emergencyContact,
        'special-needs': specialNeeds
    } = req.body;

    try {
        const users = JSON.parse(await fs.readFile(databaseFilePath, 'utf8'));
        const userIndex = users.findIndex((user) => user.id === req.user.id);

        if (userIndex !== -1) {
            const newPet = {
                id: String(Date.now()),
                name,
                type,
                breed,
                age,
                sex,
                neutered,
                weight,
                'health-history': healthHistory,
                behavior,
                diet,
                exercise,
                grooming,
                microchip,
                insurance,
                'emergency-contact': emergencyContact,
                'special-needs': specialNeeds,
                appointments: []
            };
            users[userIndex].pets.push(newPet);
            await fs.writeFile(databaseFilePath, JSON.stringify(users, null, 2), 'utf8');
            req.user.pets.push(newPet);

            res.redirect(`/appointments/${newPet.id}`);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error writing data to the database');
    }
};

const renderPetDetailsPage = async (req, res, next) => {
    const usersData = await fs.readFile(databaseFilePath, 'utf8');
    const users = JSON.parse(usersData);
    const user = users.find((user) => user.id === req.user.id);
    const pet = user.pets.find((pet) => pet.id === req.params.petId);
    if (pet) {
        res.render('pets/pet-details', { bodyClass: 'normal', pet });
    } else {
        res.status(404).send('Pet not found');
    }
};

const deletePet = async (req, res, next) => {
    try {
        const users = JSON.parse(await fs.readFile(databaseFilePath, 'utf8'));
        const userIndex = users.findIndex((user) => user.id === req.user.id);

        if (userIndex !== -1) {
            const petIndex = users[userIndex].pets.findIndex((pet) => pet.id === req.params.petId);

            if (petIndex !== -1) {
                users[userIndex].pets.splice(petIndex, 1);
                await fs.writeFile(databaseFilePath, JSON.stringify(users, null, 2), 'utf8');
                req.user.pets.splice(petIndex, 1);
                res.redirect('/pets');
            } else {
                res.status(404).send('Pet not found');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error writing data to the database');
    }
};

const renderEditPetPage = async (req, res, next) => {
    const usersData = await fs.readFile(databaseFilePath, 'utf8');
    const users = JSON.parse(usersData);
    const user = users.find((user) => user.id === req.user.id);
    const pet = user.pets.find((pet) => pet.id === req.params.petId);
    if (pet) {
        res.render('pets/edit-pet', { bodyClass: 'normal', pet });
    } else {
        res.status(404).send('Pet not found');
    }
};

const postEditPet = async (req, res, next) => {
    const {
        name,
        type,
        breed,
        age,
        sex,
        neutered,
        weight,
        'health-history': healthHistory,
        behavior,
        diet,
        exercise,
        grooming,
        microchip,
        insurance,
        'emergency-contact': emergencyContact,
        'special-needs': specialNeeds
    } = req.body;

    try {
        const users = JSON.parse(await fs.readFile(databaseFilePath, 'utf8'));
        const userIndex = users.findIndex((user) => user.id === req.user.id);

        if (userIndex !== -1) {
            const petIndex = users[userIndex].pets.findIndex((pet) => pet.id === req.params.petId);

            if (petIndex !== -1) {
                const pet = users[userIndex].pets[petIndex];
                pet.name = name;
                pet.type = type;
                pet.breed = breed;
                pet.age = age;
                pet.sex = sex;
                pet.neutered = neutered;
                pet.weight = weight;
                pet['health-history'] = healthHistory;
                pet.behavior = behavior;
                pet.diet = diet;
                pet.exercise = exercise;
                pet.grooming = grooming;
                pet.microchip = microchip;
                pet.insurance = insurance;
                pet['emergency-contact'] = emergencyContact;
                pet['special-needs'] = specialNeeds;

                await fs.writeFile(databaseFilePath, JSON.stringify(users, null, 2), 'utf8');
                req.user.pets[petIndex] = pet;

                res.redirect(`/pets/${pet.id}`);
            } else {
                res.status(404).send('Pet not found');
            }
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error writing data to the database');
    }
};

module.exports = {
    renderPetView,
    renderAddPetPage,
    postAddPet,
    renderPetDetailsPage,
    deletePet,
    renderEditPetPage,
    postEditPet
};
