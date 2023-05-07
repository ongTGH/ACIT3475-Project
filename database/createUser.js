const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const {
    datatype: { uuid, number },
    name: { firstName, lastName },
    internet: { email, password },
    animal,
} = require('faker');

const filePath = path.resolve(__dirname, 'database.json');

const generatePet = () => ({
    petId: uuid(),
    breed: animal.dog(),
    age: number({ min: 1, max: 15 }),
    height: number({ min: 10, max: 30 }),
    weight: number({ min: 5, max: 100 }),
});

const generateUser = () => ({
    id: uuid(),
    firstName: firstName(),
    lastName: lastName(),
    email: email(),
    password: password(),
    pets: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, generatePet),
});

const addUsers = async (x) => {
    try {
        const data = await readFile(filePath, 'utf8');
        const parsedData = JSON.parse(data);

        for (let i = 0; i < x; i++) {
            parsedData.push(generateUser());
        }

        await writeFile(filePath, JSON.stringify(parsedData, null, 4));

        console.log(`${x} users added successfully!`);
    } catch (error) {
        console.log('Error adding users:', error);
    }
};

const numberOfUsers = 5; // Change this value to the desired number of users
addUsers(numberOfUsers);
