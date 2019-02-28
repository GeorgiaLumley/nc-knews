const { getUsers, getUserByUsername, addNewUser } = require('../models/users');

exports.sendUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewUser = (req, res, next) => {
  addNewUser(req.body)
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendUserByUsername = (req, res, next) => {
  const singleUsername = req.params.username;
  getUserByUsername(singleUsername)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      console.log(err);
    });
};
