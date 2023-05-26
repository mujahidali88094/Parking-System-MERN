const User = require('../models/user-model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
};