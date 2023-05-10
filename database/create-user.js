const { readFile, writeFile } = require('fs').promises;
const path = require('path');
const {
    datatype: { uuid, number },
    name: { firstName },
    internet: { email, password },
    animal,
    date: { future },
    lorem: { words },
} = require('faker');

const filePath = path.resolve(__dirname, 'database.json');

const generatePet = () => ({
    petId: uuid(),
    petName: firstName(),
    breed: animal.dog(),
    age: number({ min: 1, max: 15 }),
    height: number({ min: 10, max: 30 }),
    weight: number({ min: 5, max: 100 }),
});

const generateAppointment = () => ({
    appointmentId: uuid(),
    title: words(3),
    date: future(30),
    time: `${number({ min: 1, max: 12 })}:${number({ min: 0, max: 59 }).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
});

const generateUser = () => ({
    id: uuid(),
    email: email(),
    password: password(),
    pets: Array.from({ length: Math.floor(Math.random() * 2) + 1 }, generatePet),
    appointments: Array.from({ length: Math.floor(Math.random() * 3) }, generateAppointment),
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

const numberOfUsers = 9; // Change this value to the desired number of users
addUsers(numberOfUsers);
