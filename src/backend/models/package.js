
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: Date,
});

module.exports = mongoose.model('Package', packageSchema);
