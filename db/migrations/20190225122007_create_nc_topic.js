exports.up = function(knex, Promise) {
  console.log("creating topicTable");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable.string("slug").primary();
    topicsTable.string("description");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topicsTable");
  return knex.schema.dropTable("topics");
};
