const connection = require('../db/connection');

exports.getTopics = () => connection('topics').select('*');

exports.addNewTopic = obj => connection('topics')
  .insert(obj)
  .returning('*');
