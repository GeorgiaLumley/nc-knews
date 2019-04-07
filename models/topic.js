const connection = require('../db/connection');

exports.getTopics = () => connection('topics').select('*');

exports.addNewTopic = obj => connection('topics')
  .insert(obj)
  .returning('*');

exports.deleteSingleTopic = topic_id => connection('topics')
  .del()
  .where('slug', topic_id);
