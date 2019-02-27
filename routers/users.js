const usersRouter = require('express').Router();
const { sendUsers, sendUserByUsername } = require('../controllers/users');

usersRouter.route('/').get(sendUsers);

usersRouter.route('/:username').get(sendUserByUsername);

module.exports = usersRouter;
