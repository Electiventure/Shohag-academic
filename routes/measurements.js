// routes/index.js
const express = require('express');
const router = express.Router();
const measurementsController = require('../controllers/measurementController');

// Home route
router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

// CRUD operations for 'Measurement' model
router.get('/measurements', measurementsController.index);
router.get('/measurements/new', measurementsController.newMeasurement);
router.post('/measurements', measurementsController.createMeasurement);
router.get('/measurements/:id', measurementsController.show);
router.get('/measurements/:id/edit', measurementsController.edit);
router.put('/measurements/:id', measurementsController.update);
router.delete('/measurements/:id', measurementsController.remove);

module.exports = router;
