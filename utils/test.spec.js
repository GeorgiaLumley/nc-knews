const { expect } = require('chai');
const {
  formatArticleQuery,
  validateSlug,
  correctQuerySortBy,
  correctQueryOrder,
  validatePost,
  validateId,
  formatVotes,
} = require('./index.js');

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
  it('return when author dose not exist', () => {
    const input = formatArticleQuery({
      author: 'Georgia',
      topic: 'cats',
    });
    const expected = 'err';
    expect(input).to.eql(expected);
  });
  it('return when topic dose not exist', () => {
    const input = formatArticleQuery({
      author: 'butter_bridge',
      topic: 'tests',
    });
    const expected = 'err';
    expect(input).to.eql(expected);
  });
});

describe('validateSlug', () => {
  it('rejects a post when there is already a slug that exists', () => {
    const input = validateSlug({ slug: 'cats', description: 'test' });
    const expected = 'err';
    expect(input).to.eql(expected);
  });
  it('accepts post when slug is unique', () => {
    const input = validateSlug({ slug: 'dogs', description: 'test' });
    const expected = 'fine';
    expect(input).to.eql(expected);
  });
});
describe('correctQuerySortBy', () => {
  it("checks that the columns exists when it dosen't", () => {
    const input = correctQuerySortBy('cats');
    const expected = 'err';
    expect(input).to.eql(expected);
  });
  it('checks that the columns exists when it dose', () => {
    const input = correctQuerySortBy('topic');
    const expected = 'fine';
    expect(input).to.eql(expected);
  });
});
describe('correctQueryOrder', () => {
  it('fine whens ordered by asc or desc', () => {
    const input = correctQueryOrder('asc');
    const expected = 'fine';
    expect(input).to.eql(expected);
  });
  it('errs when not ordered by asc or desc', () => {
    const input = correctQueryOrder('abc');
    const expected = 'err';
    expect(input).to.eql(expected);
  });
});
describe('validatePost', () => {
  it('return fine if all keys are included', () => {
    const input = validatePost({
      title: 'test',
      body: 'this is a test',
      votes: 5,
      topic: 'mitch',
      author: 'butter_bridge',
    });
    const expected = 'fine';
    expect(input).to.eql(expected);
  });
  it('return err if not all keys are included', () => {
    const input = validatePost({
      body: 'this is a test',
      votes: 5,
      topic: 'mitch',
      author: 'butter_bridge',
    });
    const expected = 'err';
    expect(input).to.eql(expected);
  });
});

describe('validateId', () => {
  it('the id is valid', () => {
    const input = validateId({
      article_id: '7',
    });
    const expected = true;
    expect(input).to.eql(expected);
  });
  it('the id is invalid', () => {
    const input = validateId({ article_id: 'test' });
    const expected = false;
    expect(input).to.eql(expected);
  });
});

describe('formatVotes', () => {
  it('errs when no votes are passed', () => {
    const input = formatVotes({});
    const expected = false;
    expect(input).to.eql(expected);
  });
  it('errs when no invalid vote amount is passed', () => {
    const input = formatVotes({ incVotes: 'cat' });
    const expected = false;
    expect(input).to.eql(expected);
  });
  it('errs when other keys and values are passed', () => {
    const input = formatVotes({ incVotes: '1', name: 'lily' });
    const expected = false;
    expect(input).to.eql(expected);
  });
  it('true when the correct information is passed', () => {
    const input = formatVotes({ incVotes: '1' });
    const expected = true;
    expect(input).to.eql(expected);
  });
});
