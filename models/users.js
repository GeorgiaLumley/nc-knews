const connection = require('../db/connection');

exports.getUsers = () => connection('users').select('*');
