import express from 'express';

const controller = require('../controllers/user.controller');
const photoController = require('../controllers/photo.controller');
const router = express.Router();

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.get('/users', controller.getUsers);

router.post('/load-photos', photoController.loadPhoto);
router.post('/get-photos', photoController.getPhoto);
router.post('/delete-photo', photoController.deletePhoto);
router.post('/delete-album', photoController.deleteAlbum);
router.put('/change-album-title', photoController.changeAlbumTitle);

export = router;
