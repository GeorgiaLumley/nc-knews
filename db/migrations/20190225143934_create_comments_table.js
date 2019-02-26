exports.up = function(knex, Promise) {
  console.log("creating commentsTable");
  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.string("comments_id").primary();
    commentsTable
      .string("author")
      .references("username")
      .inTable("users");
    commentsTable
      .integer("article_id")
      .references("article_id")
      .inTable("article");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.datetime("created_at").defaultTo(knex.fn.now());
    commentsTable.string("body");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing commentsTable");
  return knex.schema.dropTable("comments");
};
