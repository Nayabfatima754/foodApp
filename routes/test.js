// routes/testRoutes.js
const express = require('express');
const testUser = require('../controllers/testController');
const router = express.Router(); // Correctly create a Router instance

router.get('/test-user', testUser);

module.exports = router;
