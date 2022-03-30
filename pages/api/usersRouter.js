const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Zone = require('../models/Zone');

router.get('/:userId', async function(req, res) {
  try {
    const user = await User.findOne({ uid: req.params.userId }).lean();
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post('/', async function(req, res) {
  try {
    const user = new User(req.body);
    user.save(() => {});
    res.json('Utente creato');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.put('/', async function(req, res) {
  try {
    const { uid, msgid } = req.body;
    const user = await User.findOne({ uid: uid });
    user.msgid.push(msgid);
    let uniqueArray = [...new Set(user.msgid)];
    await User.updateOne({msgid: uniqueArray});
    res.json(uniqueArray);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/', async function(req, res) {
  try {
    const { item , id } = req.body;
    const response = await User.findOneAndUpdate(id, { $pull: { zones: item } });
    res.json('Utente aggiornato');
  } catch (error) {
    res.status(400).json(error);
  }
});

router.patch('/:userId/addZone/:zoneId', async function(req, res) {
  try {
    const { userId, zoneId } = req.params;
    const user = await User.findOne({ uid: userId });
    if (!user) throw new Error('User not found');
    const zone = await Zone.findOne({ _id : zoneId });
    if (!zone) throw new Error('Zone not found');
    if (!user.zones.some(id => String(id) === zoneId)) {
      user.zones.push(zoneId);
      await user.save();
    }
    res.json({ message: "Zona aggiunta con sucesso" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;