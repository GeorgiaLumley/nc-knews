exports.up = function(knex, Promise) {
  console.log("creating articleTable");
  return knex.schema.createTable("article", articleTable => {
    articleTable.string("article_id").primary();
    articleTable.string("title");
    articleTable.string("body");
    articleTable.integer("vote").defaultTo(0);
    articleTable
      .string("topic")
      .references("slug")
      .inTable("topics");
    articleTable
      .string("author")
      .references("username")
      .inTable("users");
    articleTable.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articleTable");
  return knex.schema.dropTable("article");
};
