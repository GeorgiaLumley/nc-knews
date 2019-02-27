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
    describe('/username', () => {
      it('GET status:200, get user by username', () => request
        .get('/api/users/rogersop')
        .expect(200)
        .then((res) => {
          expect(res.body.user).to.be.an('object');
          expect(res.body.user.name).to.equal('paul');
        }));
    });
  });
});
