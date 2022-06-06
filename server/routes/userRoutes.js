const { registerController } = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", registerController);

module.exports = router;
