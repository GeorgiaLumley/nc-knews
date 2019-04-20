process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

const request = supertest(app);

describe('test', () => {
  it('GET status:200 gets articles by there topic', () => request
    .get('/api/articles/topic?topic=cats')
    .expect(200)
    .then((res) => {
      expect(res.body.articles.length).to.eql(1);
    }));
  it('GET status:200 gets articles by there topic', () => request
    .get('/api/articles/topic?topic=mitch')
    .expect(200)
    .then((res) => {
      expect(res.body.articles.length).to.eql(10);
    }));
  it('GET status:200 serves up  order of articles in ascending order by date', () => request
    .get('/api/articles/topic?order=asc&topic=mitch')
    .expect(200)
    .then((res) => {
      expect(res.body.articles[0].title).to.eql('Moustache');
    }));
  it('GET status:200 serves up  order of articles in descending order by date', () => request
    .get('/api/articles/topic?order=desc&topic=mitch')
    .expect(200)
    .then((res) => {
      expect(res.body.articles[0].title).to.eql(
        'Living in the shadow of a great man',
      );
    }));
  it('GET status:200 serves up  order of articles in sort by', () => request
    .get('/api/articles/topic?sort_by=votes&topic=mitch')
    .expect(200)
    .then((res) => {
      expect(res.body.articles[0].title).to.eql(
        'Living in the shadow of a great man',
      );
    }));
  it('GET status:200 serves up  order of articles in sort by', () => request
    .get('/api/articles/topic?sort_by=votes&topic=mitch&order=asc')
    .expect(200)
    .then((res) => {
      expect(res.body.articles[0].title).to.eql(
        'Living in the shadow of a great man',
      );
    }));
  it('GET status:200 serves up  order of articles in sort by', () => request
    .get('/api/articles/topic?sort_by=title&topic=mitch&order=desc')
    .expect(200)
    .then((res) => {
      expect(res.body.articles[0].title).to.eql('Z');
    }));
  it('GET status:200 serves up  order of articles in sort by', () => request
    .get('/api/articles/topic?sort_by=title&topic=mitch&order=asc')
    .expect(200)
    .then((res) => {
      expect(res.body.articles[0].title).to.eql('A');
    }));
});
