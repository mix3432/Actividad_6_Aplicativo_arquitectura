const express = require('express');
const recyclingController = require('../controllers/recyclingController');
const router = express.Router();

// Ruta para obtener todos los puntos de reciclaje (GET)
router.get('/', recyclingController.getRecyclingPoints);

// Ruta para añadir un nuevo punto de reciclaje (POST)
router.post('/', recyclingController.addRecyclingPoint);

module.exports = router;
