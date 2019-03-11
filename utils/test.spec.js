const { formatArticleQuery } = require('./index.js');
const { expect } = require('chai');

describe('formatArticleQuery', () => {
  it('returns author: butter_bridge for a query of author', () => {
    const input = formatArticleQuery({ author: 'butter_bridge' });
    const expected = { author: 'butter_bridge' };
    expect(input).to.eql(expected);
  });
  it('return an empty object when author is undefined', () => {
    const input = formatArticleQuery({ author: undefined });
    const expected = {};
    expect(input).to.eql(expected);
  });
  it('return topic: cats for a query of topic', () => {
    const input = formatArticleQuery({ topic: 'cats' });
    const expected = { topic: 'cats' };
    expect(input).to.eql(expected);
  });
  it('return an object with both the correct values when two query are passed', () => {
    const input = formatArticleQuery({
      author: 'butter_bridge',
      topic: 'cats',
    });
    const expected = { author: 'butter_bridge', topic: 'cats' };
    expect(input).to.eql(expected);
  });
});
