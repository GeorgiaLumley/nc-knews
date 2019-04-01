process.env.NODE_ENV = "test";
const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

const request = supertest(app);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    describe("/users", () => {
      it("GET status:200, gives the users table", () =>
        request
          .get("/api/users")
          .expect(200)
          .then(res => {
            expect(res.body.users).to.be.an("array");
            expect(res.body.users[0]).to.contain.keys(
              "username",
              "avatar_url",
              "name"
            );
          }));
    });
    it("POST status:201, adds new user", () => {
      const userToAdd = {
        username: "GeorgiaLumley",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
        name: "Georgia Lumley"
      };
      return request
        .post("/api/users")
        .send(userToAdd)
        .expect(201)
        .then(({ body }) => {
          expect(body.user[0].name).to.equal(userToAdd.name);
        });
    });

    describe("/username", () => {
      it("GET status:200, get user by username", () =>
        request
          .get("/api/users/rogersop")
          .expect(200)
          .then(res => {
            expect(res.body.user).to.be.an("object");
            expect(res.body.user.name).to.equal("paul");
          }));
    });
  });
  describe("/topic", () => {
    it("GET status:200, returns all the topics", () =>
      request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topics).to.be.an("array");
          expect(res.body.topics[0]).to.contain.keys("slug", "description");
        }));
    it("POST status:201, adds new topic", () => {
      const topicToAdd = {
        slug: "coding",
        description: "it's hard"
      };
      return request
        .post("/api/topics")
        .send(topicToAdd)
        .expect(201)
        .then(({ body }) => {
          expect(body.topic.slug).to.equal(topicToAdd.slug);
        });
    });
  });

  describe("/articles", () => {
    it("GET status:200, returns all the articles", () =>
      request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.be.an("array");
          expect(res.body.articles[0]).to.contain.keys(
            "article_id",
            "title",
            "body",
            "votes",
            "topic",
            "author",
            "created_at"
          );
        }));
    it("POST status:201, adds new article", () => {
      const articlesToAdd = {
        title: "test",
        body: "this is a test",
        votes: 5,
        topic: "mitch",
        author: "butter_bridge"
      };
      return request
        .post("/api/articles")
        .send(articlesToAdd)
        .expect(201)
        .then(({ body }) => {
          expect(body.article[0].title).to.equal(articlesToAdd.title);
        });
    });
    it("QUERY takes a query of author", () =>
      request
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.filtered).to.have.length(2);
        }));
    it("QUERY takes a query of topic", () =>
      request
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(res => {
          expect(res.body.filtered).to.have.length(1);
        }));
    it("Query take both topic and author", () =>
      request
        .get("/api/articles?topic=mitch&&author=butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.filtered).to.have.length(2);
        }));
    it("GET status:200 serves up default sort_by of articles in ascending order by date", () =>
      request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].title).to.eql(
            "Living in the shadow of a great man"
          );
        }));
    it("GET status:200 serves up sort_by of articles by title in descending order by title", () =>
      request
        .get("/api/articles?sort_by=title")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].title).to.eql("Z");
        }));
    it("GET status:200 serves up sort_by of articles  by title in descending order by date", () =>
      request
        .get("/api/articles?sort_by=created_at&&order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].title).to.eql("Moustache");
        }));
    it("GET status:200 serves up sort_by of articles  by title in descending order by date", () =>
      request
        .get("/api/articles?order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].title).to.eql("Moustache");
        }));
    it("QUERY status:200 sets a default limit of 10", () =>
      request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.have.length(10);
        }));
    it("QUERY status:200 sets a limit of 5", () =>
      request
        .get("/api/articles?limit=5")
        .expect(200)
        .then(res => {
          expect(res.body.articles).to.have.length(5);
        }));
    it("Query sorts by author", () =>
      request
        .get("/api/articles?author=rogersop")
        .expect(200)
        .then(res => {
          expect(res.body.filtered[0].author).to.eql("rogersop");
        }));
    xit("GET status:200 has a comment count", () =>
      request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].comment_count).to.be.a("string");
          expect(res.body.articles[0].comment_count).to.eql(2);
        }));

    describe("/article_id", () => {
      it("GET status:200, get article by article_id", () =>
        request
          .get("/api/articles/7")
          .expect(200)
          .then(res => {
            expect(res.body.article).to.be.an("object");
            expect(res.body.article.title).to.equal("Z");
          }));
      it("PATCH status:200 updates the votes", () => {
        const incVotes = { incVotes: 1 };
        return request
          .patch("/api/articles/7")
          .send(incVotes)
          .expect(200)
          .then(res => {
            expect(res.body.updateVotes.votes).to.eql(1);
          });
      });

      it("PATCH status:200 updates the votes down by 1", () => {
        const incVotes = { incVotes: -1 };
        return request
          .patch("/api/articles/7")
          .send(incVotes)
          .expect(200)
          .then(res => {
            expect(res.body.updateVotes.votes).to.eql(-1);
          });
      });

      it("DELETE status:204, deletes article by its id", () =>
        request
          .delete("/api/articles/7")
          .expect(204)
          .then(request.get("/api/articles/7").expect(404)));
    });
    describe("/comments", () => {
      it("GET status 200, return all comments associated with the article", () =>
        request
          .get("/api/articles/9/comments")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.be.an("array");
            expect(res.body.comments[0]).to.contain.keys(
              "article_id",
              "author",
              "body",
              "comment_id",
              "created_at",
              "votes"
            );
          }));
      it("QUERY status:200 sort by default date in desc", () =>
        request
          .get("/api/articles/9/comments")
          .expect(200)
          .then(res => {
            expect(res.body.comments[0].comment_id).to.eql(1);
          }));
      it("QUERY status:200 sort by default date in asc", () =>
        request
          .get("/api/articles/9/comments?sort_by=author")
          .expect(200)
          .then(res => {
            expect(res.body.comments[0].comment_id).to.eql(17);
          }));
      it("QUERY status:200 sort by date in asc", () =>
        request
          .get("/api/articles/9/comments?order=asc")
          .expect(200)
          .then(res => {
            expect(res.body.comments[0].comment_id).to.eql(17);
          }));
      it("QUERY status:200 sets a default limit of 10", () =>
        request
          .get("/api/articles/1/comments")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.have.length(10);
          }));
      it("QUERY status:200 sets a limit of 5", () =>
        request
          .get("/api/articles/1/comments?limit=5")
          .expect(200)
          .then(res => {
            expect(res.body.comments).to.have.length(5);
          }));
      it("POST status:201, add new comment", () => {
        const commentToAdd = {
          author: "icellusedkars",
          body: "this is a test"
        };
        return request
          .post("/api/articles/9/comments")
          .send(commentToAdd)
          .expect(201)
          .then(res => {
            expect(res.body.comment[0].title).to.equal(commentToAdd.title);
          });
      });
    });
  });
  describe("/comments", () => {
    describe("/comment_id", () => {
      it("PATCH status:200 updates the votes", () => {
        const incVotes = { incVotes: 1 };
        return request
          .patch("/api/comments/7")
          .send(incVotes)
          .expect(200)
          .then(res => {
            expect(res.body.updateVotes).to.eql(1);
          });
      });
      it("PATCH status:200 updates the votes down by 1", () => {
        const incVotes = { incVotes: -1 };
        return request
          .patch("/api/comments/7")
          .send(incVotes)
          .expect(200)
          .then(res => {
            expect(res.body.updateVotes).to.eql(1);
          });
      });
      it("DELETE status:204, deletes comment by its id", () =>
        request.delete("/api/comments/7").expect(204));
    });
  });

  describe("error handling", () => {
    it("GET status:404 /bad-url", () =>
      request
        .get("/mitchs-endless-charm")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Not Found");
        }));
    it("GET status:404 /bad-url with more routes", () =>
      request
        .get("/bad-url/articles")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).to.equal("Not Found");
        }));
    describe("/users", () => {
      describe("/username", () => {
        it("GET status:404, for invalid user", () =>
          request
            .get("/api/users/test")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.eql("Not Found");
            }));
      });
    });
    describe("/api/topics", () => {
      it("there is no slug on the request", () => {
        const topicToAdd = {
          description: "it's hard"
        };
        return request
          .post("/api/topics")
          .send(topicToAdd)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      it("there is no description on the request", () => {
        const topicToAdd = {
          slug: "coding"
        };
        return request
          .post("/api/topics")
          .send(topicToAdd)
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal("Bad Request");
          });
      });
      it("the slug already exists in the database", () => {
        const topicToAdd = {
          slug: "cats",
          description: "are great"
        };
        return request
          .post("/api/topics")
          .send(topicToAdd)
          .expect(422)
          .then(({ body }) => {
            expect(body.msg).to.equal("Unprocessable Entity");
          });
      });
    });
    describe("/api/articles", () => {
      it("sort_by a column that doesn't exist", () =>
        request
          .get("/api/articles?sort_by=cats")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql("Bad Request");
          }));
      it("order something that is not asc or desc", () =>
        request
          .get("/api/articles?order=abc")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql("Bad Request");
          }));
      it("sort_by a author that doesn't exist", () =>
        request
          .get("/api/articles?author=cats")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql("Bad Request");
          }));

      it("sort_by a topic that doesn't exist", () =>
        request
          .get("/api/articles?topic=tests")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql("Bad Request");
          }));
      it("post is missing a title, body, topic, or username", () => {
        const articlesToAdd = {
          title: "test",
          body: "this is a test",
          votes: 5,
          author: "butter_bridge"
        };
        return request
          .post("/api/articles")
          .send(articlesToAdd)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql("Bad Request");
          });
      });
      it("post has an incorrect author or topic", () => {
        const articlesToAdd = {
          title: "test",
          body: "this is a test",
          votes: 5,
          topic: "cats",
          author: "Georgia"
        };
        return request
          .post("/api/articles")
          .send(articlesToAdd)
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.eql("Bad Request");
          });
      });
      describe("/:article_id", () => {
        it("article_id is invalid", () =>
          request
            .get("/api/articles/test")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.eql("Not Found");
            }));
        it("there is no inc_votes on the body", () =>
          request
            .patch("/api/articles/7")
            .send({})
            .expect(200)
            .then(res => {
              expect(res.body.unchangedVotes[0].votes).to.eql(0);
            }));
        it("deletes an article by an article id that dose not exist", () =>
          request
            .delete("/api/articles/100")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.eql("Bad Request");
            }));
        it("deletes an article by an article id that is invalid", () =>
          request
            .delete("/api/articles/catssss")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.eql("Bad Request");
            }));
        it("GET status:404 url contains a non-existent (but potentially valid) article_id", () =>
          request
            .get("/api/articles/30")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.eql("Not Found");
            }));
        it("PATCH status:400 if given an invalid inc_votes", () => {
          const incVotes = { incVotes: "cats" };
          return request
            .patch("/api/articles/7")
            .send(incVotes)
            .expect(200)
            .then(res => {
              expect(res.body.unchangedVotes[0].votes).to.eql(0);
            });
        });
        describe("/comments", () => {
          it("GET status:404, when non existent article id", () =>
            request
              .get("/api/articles/1000/comments")
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.eql("Not Found");
              }));

          it("GET status:404, when invalid article id", () =>
            request
              .get("/api/articles/cats/comments")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql("Bad Request");
              }));

          it("POST responds with a 400 when given an invalid body referencing a non - existent column", () => {
            const commentToAdd = {
              author: "icellusedkars",
              body: "this is a test"
            };
            return request
              .get("/api/articles/cats/comments")
              .send(commentToAdd)
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.eql("Bad Request");
              });
          });
          it("POST responds with a 422 when given a non-existent username", () => {
            const commentToAdd = {
              author: "test",
              body: "this is a test"
            };
            return request
              .post("/api/articles/7/comments")
              .send(commentToAdd)
              .expect(422)
              .then(res => {
                expect(res.body.msg).to.eql("UNPROCESSABLE ENTITY");
              });
          });
        });
      });
    });
  });
  describe("/comments/comment_id", () => {
    it("PATCH status:400 if given an invalid inc_votes", () => {
      const incVotes = { incVotes: 1 };
      return request
        .patch("/api/comments/cats")
        .send(incVotes)
        .expect(400)
        .then(res => {
          expect(res.body.unchangedVotes[0].votes).to.eql(0);
        });
    });
    it("PATCH status:404 non-existent comment_id is used", () => {
      const incVotes = { incVotes: 1 };
      return request
        .patch("/api/comments/100")
        .send(incVotes)
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.eql("Not Found");
        });
    });
  });
  describe("nc tests", () => {
    it("status:405 invalid request method for end-point", () =>
      request
        .delete("/api/articles")
        .expect(405)
        .then(res => {
          expect(res.body.msg).to.eql("Method Not Allowed");
        }));

    it('PATCH status:200 and an updated article when given a body including a valid "inc_votes" (VOTE UP', () => {
      const incVotes = { incVotes: 1 };
      return request
        .patch("/api/articles/9")
        .send(incVotes)
        .expect(200)
        .then(res => {
          expect(res.body.updateVotes.votes).to.eql(1);
        });
    });
    it("PATCH status:200 responds with an updated article when given a body including a valid inc_votes (VOTE DOWN)", () => {
      const incVotes = { incVotes: -1 };
      return request
        .patch("/api/articles/9")
        .send(incVotes)
        .expect(200)
        .then(res => {
          expect(res.body.updateVotes.votes).to.eql(-1);
        });
    });
    it("PATCH status:200s no body responds with an unmodified article", () => {
      const incVotes = {};
      return request
        .patch("/api/articles/9")
        .send(incVotes)
        .expect(200)
        .then(res => {
          expect(res.body.unchangedVotes[0].votes).to.eql(0);
        });
    });
  });
});
