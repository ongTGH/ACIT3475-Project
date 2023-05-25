const path = require('path');
const fs = require('fs');
const databaseFilePath = path.join(__dirname, '..', 'data', 'database.json');
const redirectScript = require('../public/js/redirect-script');

// Render the appointments page
const renderAppointments = (req, res, next) => {
    const user = req.user;
    const appointments = user.appointments || [];
    res.render('appointments/pet-appointments', { bodyClass: 'normal', appointments, activeLink: '', user: req.user });
};

const renderPetAppointments = (req, res, next) => {
    const user = req.user;
    const petId = req.params.petId;
    const pet = user.pets.find(pet => pet.id === petId);
    const appointments = pet ? pet.appointments || [] : [];

    res.render('appointments/pet-appointments', {
        bodyClass: 'normal',
        appointments,
        activeLink: 'appointments',
        user: req.user,
        petName: pet ? pet.name : null,
        petId: petId,
    });
};

// Create a new appointment
const createAppointment = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
    const user = users.find((user) => user.id === req.user.id);
    res.render('appointments/create-appointment', { bodyClass: 'normal', user: req.user, pets: user.pets });
};

// Save a new appointment
const saveAppointment = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
    const user = users.find((user) => user.id === req.user.id);
    const pet = user.pets.find((pet) => pet.id === req.body.pet);
    const newAppointment = {
        id: Date.now().toString(),
        title: req.body.title,
        date: req.body.date,
        desc: req.body.desc,
        time: convertTo12HourFormat(req.body.time),
        location: req.body.location,
        note: req.body.note,
    };

    pet.appointments.push(newAppointment);
    fs.writeFileSync(databaseFilePath, JSON.stringify(users), 'utf8');
    // Add a 1 second delay to to load new appointments before redirecting
    const scriptContent = redirectScript(pet.id);
    res.send(scriptContent);
};

const renderEditAppointment = (req, res, next) => {
    // Retrieve the petId and appointmentId from the request parameters
    const { petId, appointmentId } = req.params;

    // Retrieve the user and find the pet and appointment
    const user = req.user;
    const pet = user.pets.find(pet => pet.id === petId);
    const appointment = pet ? pet.appointments.find(appointment => appointment.id === appointmentId) : null;

    // Check if pet or appointment is not found
    if (!pet || !appointment) {
        // Handle error, pet or appointment not found
        return res.redirect('/appointments');
    }

    res.render('appointments/edit-appointment', {
        bodyClass: 'normal',
        user: req.user,
        petId,
        pet,
        appointment,
        pets: user.pets // Include the pets data when rendering the view
    });
};

const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    let formattedTime = '';

    let parsedHours = parseInt(hours, 10);
    let period = 'AM';

    if (parsedHours === 0) {
        formattedTime = `12:${minutes} AM`;
    } else if (parsedHours === 12) {
        formattedTime = `12:${minutes} PM`;
    } else if (parsedHours > 12) {
        parsedHours -= 12;
        formattedTime = `${parsedHours}:${minutes} PM`;
    } else {
        formattedTime = `${parsedHours}:${minutes} AM`;
    }

    return formattedTime;
};

const updateAppointment = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
    const user = users.find((user) => user.id === req.user.id);
    const pet = user.pets.find((pet) => pet.id === req.params.petId);
    const appointment = pet ? pet.appointments.find((appointment) => appointment.id === req.params.appointmentId) : null;

    if (!pet || !appointment) {
        // Handle error, pet or appointment not found
        return res.redirect('/appointments');
    }

    appointment.title = req.body.title;
    appointment.date = req.body.date;
    appointment.desc = req.body.desc;
    appointment.time = convertTo12HourFormat(req.body.time);
    appointment.location = req.body.location;
    appointment.note = req.body.note;

    fs.writeFileSync(databaseFilePath, JSON.stringify(users), 'utf8');
    // Add a 1 second delay to load updated appointment before redirecting
    const scriptContent = redirectScript(pet.id);
    res.send(scriptContent);
};

const deleteAppointment = (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
    const user = users.find((user) => user.id === req.user.id);
    const pet = user.pets.find((pet) => pet.id === req.params.petId);
    const appointmentIndex = pet ? pet.appointments.findIndex((appointment) => appointment.id === req.params.appointmentId) : -1;

    if (appointmentIndex >= 0) {
        pet.appointments.splice(appointmentIndex, 1);
        fs.writeFileSync(databaseFilePath, JSON.stringify(users), 'utf8');
        // Redirect to the appointments page
        res.redirect('/appointments/' + pet.id);
    }

};


module.exports = { renderAppointments, createAppointment, saveAppointment, renderPetAppointments, renderEditAppointment, updateAppointment, deleteAppointment };
