const { userData, topicData, articleData, commentData } = require("../data");
const { properDate } = require("../../utils");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      knex("users")
        .insert(userData)
        .returning("*")
    )
    .then(() =>
      knex("topics")
        .insert(topicData)
        .returning("*")
    )
    .then(() => {
      const correctDate = properDate(articleData);
      return knex("article")
        .insert(correctDate)
        .returning("*");
    })
    .then(articalRows => {
      const correctCommentDate = properDate(commentData);

      knex("comments")
        .insert(correctCommentDate)
        .returning("*");
    });
};
