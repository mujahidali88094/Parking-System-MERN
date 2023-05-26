const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const verifyLoggedInAsAdmin = (req, res, next) => {
  // Verify and decode the JWT token from the Authorization header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Missing token. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized as admin.' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};
const verifyLoggedInAsUser = (req, res, next) => {
  // Verify and decode the JWT token from the Authorization header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Missing token. Authorization denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'user') {
      return res.status(401).json({ message: 'Not authorized as admin.' });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token. Authorization denied.' });
  }
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  // returns the distance in kilometers between two points on the earth (specified in decimal degrees)
  const earthRadius = 6371; // Radius of the Earth in kilometers

  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const deltaLat = toRadians(lat2 - lat1);
  const deltaLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;
  return distance;
}


module.exports = { verifyLoggedInAsAdmin, verifyLoggedInAsUser,calculateDistance };
