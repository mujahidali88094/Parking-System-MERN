const Booking = require('../models/booking-model');

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  if (!req.params.parkingAreaId  || !req.params.startTime || !req.params.endTime) {
    return res.status(400).json({ message: 'Missing required fields: parkingAreaId, startTime, endTime' });
  }
  const { parkingAreaId, startTime, endTime } = req.params;
  console.log(parkingAreaId, startTime, endTime);
  try {
    const bookings = await Booking.find({ parkingAreaId, startTime: { $lte: endTime }, endTime: { $gte: startTime } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createBooking = async (req, res) => {
  if (!req.body.parkingAreaId || !req.body.slot  || !req.body.startTime || !req.body.endTime || !req.body.status) {
    return res.status(400).json({ message: 'Missing required fields: parkingAreaId, slot, startTime, endTime, status' });
  }

  req.body.userId = req.user._id;

  try {
    //check if slot is available
    const { parkingAreaId, slot, startTime, endTime } = req.body;
    const bookings = await Booking.find({ parkingAreaId, slot, startTime: { $lte: endTime }, endTime: { $gte: startTime } });
    if (bookings.length > 0) {
      return res.status(400).json({ error: 'Slot is not available' });
    }
    //book slot
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: 'Booking created successfully', booking });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBookings,
  getBookings,
  createBooking
};
