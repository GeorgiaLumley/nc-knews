const {
  getTopics,
  addNewTopic,
  deleteSingleTopic
} = require("../models/topic");

exports.sendTopics = (req, res, next) => {
  getTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(err => {
      next(err);
    });
};

exports.postTopic = (req, res, next) => {
  addNewTopic(req.body)
    .then(([topic]) => {
      if (topic.slug === undefined || topic.description === undefined) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
      getTopics().then(slug => {
        for (let i = 0; i < slug.length; i++) {
          if (slug[i] === req.body.slug)
            return Promise.reject({ status: 422, msg: "Unprocessable Entity" });
        }

        res.status(201).send({ topic });
      });
    })
    .catch(err => {
      next(err);
    });
};

exports.deleteTopic = (req, res, next) => {
  const { topic_id } = req.params;
  console.log(req.params);
  deleteSingleTopic(topic_id)
    .then(topicDeleted => {
      console.log("hi", topicDeleted);
      if (topicDeleted === 0) {
        return Promise.reject({ status: 400, msg: "Bad Request" });
      }
      if (topicDeleted === 1) res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
};
