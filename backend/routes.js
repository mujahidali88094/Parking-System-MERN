const router = require('express').Router();

const { getAllUsers, signup, login } = require('./controllers/user-controller');
const { verifyLoggedInAsAdmin, verifyLoggedInAsUser } = require('./utils');

router.get('/users', verifyLoggedInAsAdmin, getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;