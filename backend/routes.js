const router = require('express').Router();
const { verifyLoggedIn, verifyIsUser, verifyIsAdmin } = require('./utils');

const { getAllUsers, signup, login } = require('./controllers/user-controller');
const { getAllParkingAreas, createParkingArea, updateParkingArea, deleteParkingArea } = require('./controllers/parking-area-controller');

router.get('/users', verifyLoggedIn, verifyIsAdmin, getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

router.get('/parking-areas', verifyLoggedIn, getAllParkingAreas);
router.post('/parking-areas', verifyLoggedIn, verifyIsAdmin, createParkingArea);
router.put('/parking-areas/:id', verifyLoggedIn, verifyIsAdmin, updateParkingArea);
router.delete('/parking-areas/:id', verifyLoggedIn, verifyIsAdmin, deleteParkingArea);

module.exports = router;