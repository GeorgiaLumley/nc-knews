const connection = require('../db/connection');

exports.getUsers = () => connection('users').select('*');

exports.getUserByUsername = singleUsername => connection('users')
  .select('*')
  .where('username', singleUsername);

exports.addNewUser = obj => connection('users')
  .insert(obj)
  .returning('*');
