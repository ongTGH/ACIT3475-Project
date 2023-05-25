const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticate');
const petController = require('../controllers/pet-controller');

// Rendering the pet-view page
router.get('/pets', auth.checkAuthenticated, petController.renderPetView);

// Rendering the add-pet page
router.get('/pets/add-pet', auth.checkAuthenticated, petController.renderAddPetPage);

// Adding a new pet
router.post('/pets/add-pet', auth.checkAuthenticated, petController.postAddPet);
router.get('/pets/:petId', petController.renderPetDetailsPage);

// Deleting a pet
router.post('/pets/:petId/delete', auth.checkAuthenticated, petController.deletePet);

// Rendering the edit-pet page
router.get('/pets/:petId/edit', petController.renderEditPetPage);
router.post('/pets/:petId/edit', petController.postEditPet);


module.exports = router;