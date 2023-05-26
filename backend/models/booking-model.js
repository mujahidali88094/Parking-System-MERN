const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  parkingAreaId: String,
  slot: Number,
  userId: String,
  startTime: Date,
  endTime: Date,
  status: String,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
