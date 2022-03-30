const express = require('express');
const router = express.Router();
const loadAlerts = require('../utility/loadAlerts');

// TODO: da togliere
router.post('/', async function(req, res) {
  try {
    await loadAlerts();
    res.send('Alert aggiornati');
  } catch (error) {
    console.log(error)
    res.status(400).json(error);
  }
});

module.exports = router;