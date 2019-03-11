exports.up = function (knex, Promise) {
  return knex.schema.createTable('article', (articleTable) => {
    articleTable.increments('article_id').primary();
    articleTable.string('title').notNullable();
    articleTable.string('body', 2000);
    articleTable.integer('votes').defaultTo(0);
    articleTable
      .string('topic')
      .references('slug')
      .inTable('topics')
      .notNullable();
    articleTable
      .string('author')
      .references('username')
      .inTable('users')
      .notNullable();
    articleTable.date('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('article');
};
