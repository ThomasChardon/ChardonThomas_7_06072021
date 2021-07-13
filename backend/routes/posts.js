
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/posts');

router.get('/', stuffCtrl.GetAllPosts);
// router.get('/', auth, stuffCtrl.GetAllPosts);
router.post('/createPost', multer, stuffCtrl.CreatePost);
// router.post('/create', auth, multer, stuffCtrl.CreatePost);
// router.get('/:id', auth, stuffCtrl.GetOneThing);
// router.put('/:id', auth, multer, stuffCtrl.modifyThing);
// router.delete('/:id', auth, stuffCtrl.deleteThing);
// router.post('/:id/like', auth, stuffCtrl.likeThing);

module.exports = router;