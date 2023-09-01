const express = require('express');
const router = express.Router();
const Package = require('../models/package'); // Ajusta la ruta según tu estructura

// Ruta para obtener coordenadas
router.get('/coordinates', async (req, res) => {
  try {
    const coordinates = await Package.find().sort({ timestamp: 1 });
    res.json(coordinates);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener coordenadas' });
  }
});

// Ruta para guardar coordenadas
router.post('/coordinates', async (req, res) => {
  const { latitude, longitude } = req.body;

  try {
    const newPackage = new Package({ latitude, longitude, timestamp: new Date() });
    await newPackage.save();
    io.emit('newCoordinates', newPackage);
    res.json(newPackage);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar coordenadas' });
  }
});

module.exports = router;
