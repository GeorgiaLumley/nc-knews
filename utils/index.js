const convertDate = date => new Date(date);

const formattedArticles = articles => articles.map(article => ({
  title: article.title,
  body: article.body,
  topic: article.topic,
  author: article.author,
  created_at: convertDate(article.created_at),
}));

const getArticleIds = articlesRows => articlesRows.map((articleRow) => {
  const articleObj = {
    title: articleRow.title,
    article_id: articleRow.article_id,
  };
  return articleObj;
});

const getArticleId = (title, articleIdList) => {
  const article = articleIdList.filter(
    articleRow => articleRow.title === title,
  );
  if (article.length > 0) {
    return article[0].article_id;
  }
  return -1;
};

const correctComments = (comments, articlesRows) => {
  const formattedComments = [];
  comments.forEach((comment) => {
    const article_id = getArticleId(comment.belongs_to, articlesRows);
    if (article_id !== -1) {
      const newComment = {};
      const epochTime = comment.created_at;
      comment.created_at = convertDate(epochTime);
      newComment.created_at = convertDate(epochTime);
      newComment.article_id = article_id;
      newComment.author = comment.created_by;
      newComment.body = comment.body;
      newComment.votes = comment.votes;

      formattedComments.push(newComment);
    }
  });
  return formattedComments;
};

const formatArticleQuery = (query) => {
  const obj = {};
  if (query.author !== undefined) obj.author = query.author;
  if (query.topic !== undefined) obj.topic = query.topic;

  return obj;
};

module.exports = {
  formattedArticles,
  getArticleIds,
  correctComments,
  getArticleId,
  formatArticleQuery,
};
