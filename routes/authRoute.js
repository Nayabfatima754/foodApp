const express = require('express');
const { register, login, currentUser, updateUserData, updatePassword, deleteProfile, orderStatusController } = require('./../controllers/authCOntroller')
const router = express.Router();
const jwtAuthMiddleware = require('../jwtAuth');
const { adminMiddleware } = require('./../adminMiddleware'); // Correct destructuring

router.post('/register', register);
router.post('/login', login);
router.get('/current', jwtAuthMiddleware, currentUser);
router.put('/update', jwtAuthMiddleware, updateUserData);
router.put('/updatePassword', jwtAuthMiddleware, updatePassword);
router.delete('/:id', jwtAuthMiddleware, deleteProfile);
router.post('/orderStatus/:id', jwtAuthMiddleware, adminMiddleware, orderStatusController);

module.exports = router;
