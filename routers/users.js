const usersRouter = require('express').Router();
const {
  sendUsers,
  sendUserByUsername,
  postNewUser,
} = require('../controllers/users');

usersRouter
  .route('/')
  .get(sendUsers)
  .post(postNewUser);

usersRouter.route('/:username').get(sendUserByUsername);

module.exports = usersRouter;
