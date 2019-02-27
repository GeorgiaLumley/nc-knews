const { getUsers, getUserByUsername } = require('../models/users');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      console.log(users);
      res.status(200).send({ users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendUserByUsername = (req, res, next) => {
  const singleUsername = req.params.username;
  getUserByUsername(singleUsername).then(([user]) => {
    res.status(200).send({ user });
  });
};
