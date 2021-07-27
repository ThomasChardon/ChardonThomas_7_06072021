
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/posts');

router.get('/Posts', stuffCtrl.GetAllPosts);
// router.get('/Posts', auth, stuffCtrl.GetAllPosts);
router.get('/Posts/:id', stuffCtrl.GetOnePosts);
// router.get('/', auth, stuffCtrl.GetAllPosts);
router.post('/createPost', multer, stuffCtrl.CreatePost);
// router.post('/create', auth, multer, stuffCtrl.CreatePost);
// router.put('/:id', auth, multer, stuffCtrl.modifyThing);
// router.delete('/:id', auth, stuffCtrl.deleteThing);
// router.post('/:id/like', auth, stuffCtrl.likeThing);

module.exports = router;