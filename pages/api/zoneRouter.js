const express = require('express');
const router = express.Router();
const Zone = require('../models/Zone');
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    const zone = new Zone(req.body);
    await zone.save();
    res.status(201).json(zone._id);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/name/:item', async (req, res) => {
  try {
    const {item} = req.params;
    const zones = await Zone.findById(item);
    res.status(200).json(zones);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:item', async (req, res) => {
  try {
    const {item} = req.params;
    await Zone.deleteMany({_id:item});
    await User.updateMany({},{$pull:{"zones":item}});
    res.status(200).json("Zona eliminata");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get('/', async (req, res) => {
  try {
    const zones = await Zone.find();
    res.status(200).json(zones);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;