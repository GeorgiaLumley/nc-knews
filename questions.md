{  

    "Articles: /api/articles":{  
       "GET":"Gets all articles (without body). Can filter by author and topic.",
       "POST":"Given a json with title, body, topic and username, creates an article"
    },
    "Article: /api/articles/:article_id":{  
       "GET":"Returns info on given article. Includes comment count",
       "PATCH":"Given a json with inc_votes, updates the in/decrements the votes of the given article_id",
       "DELETE":"Deletes an article and all its associated comments"
    },
