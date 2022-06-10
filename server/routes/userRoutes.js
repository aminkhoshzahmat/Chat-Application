const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.post("/avatar/:id", setAvatar);
router.get("/all-users/:id", getAllUsers);

module.exports = router;
