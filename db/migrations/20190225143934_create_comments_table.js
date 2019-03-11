exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comments_id').primary();
    commentsTable
      .string('author')
      .references('username')
      .inTable('users')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('article_id')
      .inTable('article');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.datetime('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body', 1000);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('comments');
};
