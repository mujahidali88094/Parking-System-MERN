const Booking = require('../models/booking-model');

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    // Convert the date fields in the records
    const convertedRecords = bookings.map((record) => {
      return {
        ...record.toObject(),
        startTime: record.startTime.toLocaleString(),
        endTime: record.endTime.toLocaleString(),
      };
    });
    res.json(convertedRecords);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookings = async (req, res) => {
  if (!req.params.parkingAreaId  || !req.params.startTime || !req.params.endTime) {
    return res.status(400).json({ message: 'Missing required fields: parkingAreaId, startTime, endTime' });
  }
  const { parkingAreaId, startTime, endTime } = req.params;
  // Query to check for conflicts
  const query = {
    parkingAreaId,
    $or: [
      {
        startTime: { $lt: startTime },
        endTime: { $gt: startTime },
      },
      {
        startTime: { $lt: endTime },
        endTime: { $gt: endTime },
      },
      {
        startTime: { $gte: startTime },
        endTime: { $lte: endTime },
      },
    ],
  };
  try {
    const bookings = await Booking.find(query);
    // Convert the date fields in the records
    const convertedRecords = bookings.map((record) => {
      return {
        ...record.toObject(),
        startTime: record.startTime.toLocaleString(),
        endTime: record.endTime.toLocaleString(),
      };
    });
    res.json(convertedRecords);
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
    // Query to check for conflicts
    const query = {
      parkingAreaId,
      slot,
      $or: [
        {
          startTime: { $lt: startTime },
          endTime: { $gt: startTime },
        },
        {
          startTime: { $lt: endTime },
          endTime: { $gt: endTime },
        },
        {
          startTime: { $gte: startTime },
          endTime: { $lte: endTime },
        },
      ],
    };
    const bookings = await Booking.find(query);
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
