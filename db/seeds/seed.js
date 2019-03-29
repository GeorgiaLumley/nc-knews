const { userData, topicData, articleData, commentData } = require("../data");
const {
  formattedArticles,
  correctComments,
  getArticleIds
} = require("../../utils");

exports.seed = function(knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() =>
      Promise.all([
        knex("users")
          .insert(userData)
          .returning("*"),

        knex("topics")
          .insert(topicData)
          .returning("*")
      ])
    )
    .then(([userRows, topicRows]) => {
      const formatArticles = formattedArticles(articleData);
      return Promise.all([
        userRows,
        topicRows,
        knex("articles")
          .insert(formatArticles)
          .returning("*")
      ])
        .then(([userRows, topicRows, articleRows]) => {
          const formatArticlesList = getArticleIds(articleRows);
          const formattedComments = correctComments(
            commentData,
            formatArticlesList
          );
          return Promise.all([
            userRows,
            topicRows,
            articleRows,
            knex("comments")
              .insert(formattedComments)
              .returning("*")
          ]);
        })
        .catch(err => console.log(err));
    });
};
