const { getTopics, addNewTopic } = require('../models/topic');

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postTopic = (req, res, next) => {
  addNewTopic(req.body)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch((err) => {
      console.log(err);
    });
};
