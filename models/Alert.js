const { Schema, model } = require('mongoose');

const Pair = {
  lat: Number,
  lng: Number
};

const AlertSchema = new Schema({
  country: String,
  city: String,
  reliability: Number,
  uuid: { type: String, unique: true },
  roadType: Number,
  subtype: String,
  location: Pair,
}, { timestamps: true });

AlertSchema.path('uuid').index({ unique: true });
module.exports = model('Alert', AlertSchema);