const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/', userCtrl.verifToken);
router.post('/login', userCtrl.login);
router.post('/passwordForgot', userCtrl.mdpOublie);

module.exports = router;