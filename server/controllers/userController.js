const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username: username });
    if (usernameCheck) {
      return res.status(400).json({
        status: false,
        message: "Username already exists",
      });
    }

    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    delete user.password;

    res.status(200).json({
      status: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Username or password is incorrect",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: false,
        message: "Username or password is incorrect",
      });
    }

    delete user.password;

    res.status(200).json({
      status: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
