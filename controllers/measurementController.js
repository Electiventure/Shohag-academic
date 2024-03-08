// controllers/measurementsController.js
const Measurement = require('../models/Measurement');

const index = async (req, res) => {
  try {
    const measurements = await Measurement.find({});
    res.render('measurements/index', { measurements });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const newMeasurement = (req, res) => {
  res.render('measurements/new');
};

const createMeasurement = (req, res) => {
  if (!req.body.measurement.place || !req.body.measurement.date || !req.body.measurement.value || !req.body.measurement.type) {
    return res.status(400).send('All fields are required');
  }

  Measurement.create(req.body.measurement)
    .then(newMeasurement => {
      res.redirect('/measurements');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

const show = async (req, res) => {
  try {
    const foundMeasurement = await Measurement.findById(req.params.id);
    res.render('measurements/show', { measurement: foundMeasurement });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const edit = async (req, res) => {
  try {
    const foundMeasurement = await Measurement.findById(req.params.id);
    res.render('measurements/edit', { measurement: foundMeasurement });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const update = async (req, res) => {
  try {
    await Measurement.findByIdAndUpdate(req.params.id, req.body.measurement);
    res.redirect('/measurements/' + req.params.id);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const remove = async (req, res) => {
  try {
    await Measurement.findByIdAndRemove(req.params.id);
    res.redirect('/measurements');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  index,
  newMeasurement,
  createMeasurement,
  show,
  edit,
  update,
  remove
};
