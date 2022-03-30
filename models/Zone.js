const { Schema, model } = require('mongoose');

const Pair = {
  lat: Number,
  lng: Number
};

const ZoneSchema = new Schema({
  name: String,
  location: [Pair],
  admin: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = model('Zone', ZoneSchema);