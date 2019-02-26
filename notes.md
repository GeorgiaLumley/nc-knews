```
const formatComments = (comments, articlesRows) => {
  const formattedComments = [];
  comments.forEach((comment) => {
    const article_id = getArticleId(comment.belongs_to, articlesRows);
    if (article_id !== -1) {
      const newComment = {};
      const epochTime = comment.created_at;
      comment.created_at = convertFromEpoch(epochTime);
      newComment.created_at = convertFromEpoch(epochTime);
      newComment.article_id = article_id;
      newComment.author = comment.created_by;
      newComment.body = comment.body;
      newComment.votes = comment.votes;

      formattedComments.push(newComment);
    }
  });
  return formattedComments;
};
```
