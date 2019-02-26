const convertDate = date => new Date(date);

exports.properDate = articles => {
  return articles.map(article => {
    return {
      title: article.title,
      body: article.body,
      topic: article.topic,
      author: article.author,
      created_at: convertDate(article.created_at)
    };
  });
};
