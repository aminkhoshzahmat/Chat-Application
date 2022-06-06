module.exports.registerController = (req, res, next) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  res.status(200).json({
    status: 202,
    value: `${username}`,
  });
};
