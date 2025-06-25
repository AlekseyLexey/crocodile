const router = require('express').Router();
const upload = require('../config/multerConfig'); //?Multer
const roomRouter = require('./api/roomRouter');

const {
  registration,
  login,
  logout,
  refresh,
  updateUser,
  getUser,
} = require('../controllers/userController');

const authMiddleware = require('../middlewares/authMiddleware');
const themeRouter = require('./api/themeRouter');
const wordRouter = require('./api/wordRouter');
const userRoomRouter = require('./api/userRoomRouter');
const themeRoomRouter = require('./api/themeRoomRouter');
const buyRouter = require('./api/buyRouter');
const categoryRouter = require('./api/categoryRouter');
const productRouter = require('./api/productRouter');
const pictureRouter = require('./api/pictureRouter');

router.post('/registration', registration);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.put('/user', authMiddleware, updateUser);
router.get('/user', authMiddleware, getUser);

router.use('/rooms', authMiddleware, roomRouter);
router.use('/picture', pictureRouter);

router.use('/words', wordRouter);
router.use('/themes', themeRouter);
router.use('/user-room', authMiddleware, userRoomRouter);
router.use('/theme-room', authMiddleware, themeRoomRouter);
router.use('/buies', authMiddleware, buyRouter);
router.use('/categories', categoryRouter);
router.use('/products', authMiddleware, productRouter);

// ?Multer пример подключения
// router.use(
//   "/example",
//   authMiddleware,
//   upload.single("imgURL"),
//   exampleController
// );

module.exports = router;
