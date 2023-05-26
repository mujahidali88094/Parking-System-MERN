const User = require('../models/user-model');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
};

const signup = async (req, res) => {
  try {
    const user = new User(req.body);

    //check if email already exists
    const usersWithSameEmail = await User.find({ email: user.email });
    if (usersWithSameEmail.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    await user.save();
    res.json({ message: 'Signup successful', user });
  } catch(error) {
    res.status(500).json({ error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.find({ email });
    if (users.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (users[0].password !== password) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const user = users[0].toJSON();
    delete user.password;
    res.json({ message: 'Login successful', user });
  }catch(error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
};