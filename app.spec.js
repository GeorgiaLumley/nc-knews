process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('./app');
const connection = require('./db/connection');
const request = require('supertest')(app);

describe('/', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    describe('/users', () => {
      it('GET status:200, gives the users table', () => request
        .get('/api/users')
        .expect(200)
        .then((res) => {
          expect(res.body.users).to.be.an('array');
          expect(res.body.users[0]).to.contain.keys(
            'username',
            'avatar_url',
            'name',
          );
        }));
    });
    it('POST status:201, adds new user', () => {
      const userToAdd = {
        username: 'GeorgiaLumley',
        avatar_url:
          'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
        name: 'Georgia Lumley',
      };
      return request
        .post('/api/users')
        .send(userToAdd)
        .expect(201)
        .then(({ body }) => {
          expect(body.user[0].name).to.equal(userToAdd.name);
        });
    });
  });
  describe('/username', () => {
    it('GET status:200, get user by username', () => request
      .get('/api/users/rogersop')
      .expect(200)
      .then((res) => {
        expect(res.body.user).to.be.an('object');
        expect(res.body.user.name).to.equal('paul');
      }));
  });
  describe('/topic', () => {
    it('GET status:200, returns all the topics', () => request
      .get('/api/topics')
      .expect(200)
      .then((res) => {
        expect(res.body.topics).to.be.an('array');
        expect(res.body.topics[0]).to.contain.keys('slug', 'description');
      }));
    it('POST status:201, adds new topic', () => {
      const topicToAdd = {
        slug: 'coding',
        description: "it's hard",
      };
      return request
        .post('/api/topics')
        .send(topicToAdd)
        .expect(201)
        .then(({ body }) => {
          expect(body.topic[0].slug).to.equal(topicToAdd.slug);
        });
    });
  });

  describe('/articles', () => {
    it('GET status:200, returns all the articles', () => request
      .get('/api/articles')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.be.an('array');
        'article_id',
        'title',
        'body',
        'votes',
        'topic',
        'author',
        'created_at';
      }));
    it('POST status:201, adds new article', () => {
      const articlesToAdd = {
        title: 'test',
        body: 'this is a test',
        votes: 5,
        topic: 'mitch',
        author: 'butter_bridge',
      };
      return request
        .post('/api/articles')
        .send(articlesToAdd)
        .expect(201)
        .then(({ body }) => {
          expect(body.article[0].title).to.equal(articlesToAdd.title);
        });
    });
    it('QUERY takes a query of author', () => request
      .get('/api/articles?author=butter_bridge')
      .expect(200)
      .then((res) => {
        expect(res.body.articles).to.have.length(3);
      }));
    describe('/article_id', () => {
      it('GET status:200, get article by article_id', () => request
        .get('/api/articles/7')
        .expect(200)
        .then((res) => {
          expect(res.body.article).to.be.an('object');
          expect(res.body.article.title).to.equal('Z');
        }));
      it('DELETE status:204, deletes article by its id', () => request.delete('/api/articles/7').expect(204));
    });
    describe('/comments', () => {
      it('GET status 200, return all comments associated with the article', () => request
        .get('/api/articles/9/comments')
        .expect(200)
        .then((res) => {
          expect(res.body.comments).to.be.an('array');
        }));
      it('POST status:201, add now comment', () => {
        const commentToAdd = {
          author: 'icellusedkars',
          body: 'this is a test',
        };
        return request
          .post('/api/articles/9/comments')
          .send(commentToAdd)
          .expect(201)
          .then(({ body }) => {
            expect(body.comment[0].title).to.equal(commentToAdd.title);
          });
      });
    });
  });
  describe('/comments', () => {
    describe('/comment_id', () => {
      it('PATCH status:200, updated comment votes', () => {
        const update = {
          votes: 10,
        };
        return request
          .patch('/api/comments/19')
          .send(update)
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(update.votes);
          });
      });
    });
  });
});
