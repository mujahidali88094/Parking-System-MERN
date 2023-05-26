const router = require('express').Router();

const {getAllUsers, signup, login} = require('./controllers/user-controller');

router.get('/users', getAllUsers);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;