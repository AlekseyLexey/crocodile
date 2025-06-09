const router = require("express").Router();
const upload = require("../config/multerConfig"); //?Multer

const {
  registration,
  login,
  logout,
  refresh,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/registration", registration);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);

// ?Multer пример подключения
// router.use(
//   "/example",
//   authMiddleware,
//   upload.single("imgURL"),
//   exampleController
// );

module.exports = router;
