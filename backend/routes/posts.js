
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/posts');

router.get('/Posts', auth, stuffCtrl.GetAllPosts);
router.get('/Posts/:id', auth, stuffCtrl.GetOnePosts);
router.post('/createPost', auth, multer, stuffCtrl.CreatePost);
router.post('/Posts/createCom/:id', auth, stuffCtrl.CreateCom);

module.exports = router;