const router = require('express').Router();

const {getAllUsers} = require('./controllers/user-controller');

router.get('/users', getAllUsers);

module.exports = router;