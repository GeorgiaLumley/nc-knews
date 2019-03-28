const usersRouter = require('express').Router();
const {
  sendUsers,
  sendUserByUsername,
  postNewUser,
} = require('../controllers/users');
const { methodNotAllowed } = require('../controllers/err');

usersRouter
  .route('/')
  .get(sendUsers)
  .post(postNewUser)
  .all(methodNotAllowed);

usersRouter
  .route('/:username')
  .get(sendUserByUsername)
  .all(methodNotAllowed);

module.exports = usersRouter;
