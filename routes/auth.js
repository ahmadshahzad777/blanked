const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

const auth = {
    login: require(path.join(__dirname, 'auth', 'login')),
    register: require(path.join(__dirname, 'auth', 'register')),
};

router.use('/login', auth.login);
router.use('/register', auth.register);
