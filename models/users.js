const connection = require('../db/connection');

exports.getUsers = () => connection('users').select('*');

exports.getUserByUsername = (singleUsername) => {
  console.log('username', singleUsername);
  return connection('users')
    .select('*')
    .where('username', singleUsername);
};
