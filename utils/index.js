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

const authors = ['butter_bridge', 'icellusedkars', 'rogersop'];
const topics = ['mitch', 'cats'];

const formatArticleQuery = (query) => {
  if (
    (authors.includes(query.author) || query.author === undefined)
    && (topics.includes(query.topic) || query.topic === undefined)
  ) {
    const obj = {};
    if (query.author !== undefined) obj.author = query.author;
    if (query.topic !== undefined) obj.topic = query.topic;

    return obj;
  }
  return 'err';
};

const db = [
  { slug: 'mitch', description: 'tho man, the mitch, the legend' },
  { slug: 'cats', description: 'not dogs' },
];

const validateSlug = (obj) => {
  for (let i = 0; i < db.length; i++) {
    if (db[i].slug === obj.slug) return 'err';
  }
  return 'fine';
};

const columns = [
  'article_id',
  'title',
  'body',
  'votes',
  'topic',
  'author',
  'created_at',
];
const correctQuerySortBy = (sort_by) => {
  if (sort_by === undefined) return 'fine';
  if (columns.includes(sort_by)) {
    return 'fine';
  }
  return 'err';
};

const correctQueryOrder = (order) => {
  if (order === undefined) return 'fine';
  if (order === 'asc' || order === 'desc') {
    return 'fine';
  }
  return 'err';
};

const validatePost = (body) => {
  if (authors.includes(body.author) && topics.includes(body.topic)) {
    const articleKeys = ['title', 'body', 'votes', 'topic', 'author'];
    const keys = Object.keys(body);
    if (articleKeys.length !== keys.length) return 'err';
    const orderedArticleKeys = articleKeys.sort();
    const orderedKeys = keys.sort();
    for (let i = 0; i < orderedArticleKeys.length; i++) {
      if (orderedArticleKeys[i] !== orderedKeys[i]) {
        return 'err';
      }
      return 'fine';
    }
  } else {
    return 'err';
  }
};

const validateId = (id) => {
  console.log('in', id);
  if (!isNaN(id.article_id)) {
    return true;
  }
  return false;
};

const formatVotes = (body) => {
  const bodArr = Object.keys(body);
  if (bodArr[0] !== 'incVotes') return false;
  if (isNaN(body.incVotes)) return false;
  if (bodArr.length !== 1) return false;
  return true;
};

module.exports = {
  formattedArticles,
  getArticleIds,
  correctComments,
  getArticleId,
  formatArticleQuery,
  validateSlug,
  correctQuerySortBy,
  correctQueryOrder,
  validatePost,
  validateId,
  formatVotes,
};
