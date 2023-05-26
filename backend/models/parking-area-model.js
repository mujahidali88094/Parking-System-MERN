const mongoose = require('mongoose');

const { Schema } = mongoose;

const parkingAreaSchema = new Schema({
  name: String,
  address: String,
  lat: Number,
  lng: Number,

});

const ParkingArea = mongoose.model('ParkingArea', parkingAreaSchema);

module.exports = ParkingArea;
