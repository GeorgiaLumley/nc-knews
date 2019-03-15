# NC KNEWS

This is the sprint for nc knews. With articles, comments topics and users.

## Prerequisites

Things to install;

- **chai**: 2.4 `npm i chai`
- **express**: 4.16 `npm i express`
- **knex**: 0.15 `npm i knex pg`
- **mocha**: 6.0 `npm i mocha`
- **pg**: 7.8
- **supertest**: 3.4 `npm i supertest`
- **eslint**: 5.9 `npm i eslint`
- **husky**: 1.1 `npm i huskf`
- **fs**: 0.0.1 `npm i fs`

## creating knexfile.js

a 

## Running the Tests

In the terminal type `npm test` this should run all the test in the spec file.

### What the tests do?

#### Users

- **GET status:200, gives the users table**: this test is to show all of the users in the data base.

- **POST status:201, adds new user**: tests that a new user can be added to the database.
- **GET status:200, get user by username**: tests that a users information can be gathered by there user name.

#### Topics

- **GET status:200, returns all the topics**: tests that all of the topics can be gathered.

- **POST status:201, adds new topic**: tests that a new topic can be added to the database.

#### Articles

- **GET status:200, returns all the articles**: tests that all of the articles can be gathered.

- **POST status:201, adds new article**: test that a new article can be added to the database.

##### Article_id

- **GET status:200, get article by article_id**: tests that a specific article can be gathered bt its id.

- **DELETE status:204, deletes article by its id**: test that an article can be deleted by its article id.

#### Comments

- **GET status 200, return all comments associated with the article**: test that the comments of an article can be gathered by the article id.

- **POST status:201, add now comment**: tests that a new comment can be added to an article.

- **PATCH status:200, updated comment votes**: tests that a comment can be updated
