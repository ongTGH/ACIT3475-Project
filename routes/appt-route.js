const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const apptController = require('../controllers/appt-controller');


router.get('/appointments', auth.checkAuthenticated, apptController.renderAppointments);
router.get('/appointments/create', auth.checkAuthenticated, apptController.createAppointment);
router.post('/appointments/create', auth.checkAuthenticated, apptController.saveAppointment);
router.get('/appointments/:petId', auth.checkAuthenticated, apptController.renderPetAppointments);

router.get('/appointments/:petId/:appointmentId/edit', auth.checkAuthenticated, apptController.renderEditAppointment);
router.post('/appointments/:petId/:appointmentId/edit', auth.checkAuthenticated, apptController.updateAppointment);

router.post('/appointments/:petId/:appointmentId/delete', auth.checkAuthenticated, apptController.deleteAppointment);


module.exports = router;