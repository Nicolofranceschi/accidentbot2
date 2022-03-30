const express = require('express');
const geolib = require('geolib');
const router = express.Router();
const Alert = require('../models/Alert');
const Zone = require('../models/Zone');

const changeLatLngToLatitudeLongitude = ({ lat, lng }) => ({ latitude: lat, longitude: lng });

router.get('/', async function(req, res) {
  try {
    const { zones } = req.query;
    const alerts = await Alert.find().lean();

    const getAlertsForZone = async zone => {
      const dbZone = await Zone.findById(zone).lean();
      if (!dbZone) throw new Error('Zona non trovata');
      const locations = dbZone.location.map(changeLatLngToLatitudeLongitude);
      return alerts.filter(a => geolib.isPointInPolygon(changeLatLngToLatitudeLongitude(a.location), locations));
    }

    const promises = new Array(zones).flat().map(getAlertsForZone);
    const values = await Promise.all(promises);

    res.json(values.flat());
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
});

module.exports = router;