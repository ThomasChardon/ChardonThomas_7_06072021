const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/', userCtrl.verifToken);
router.post('/login', userCtrl.login);
router.post('/passwordForgot', userCtrl.mdpOublie);
router.get('/Profile/:id', userCtrl.getProfile);
router.put('/Profile', userCtrl.updateProfile);
router.delete('/Profile/:id', userCtrl.deleteUser);

module.exports = router;