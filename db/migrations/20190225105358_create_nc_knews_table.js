exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", usersTable => {
    console.log("creating usersTable");
    usersTable.string("username").primary();
    usersTable.string("avatar_url");
    usersTable.string("name");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing usersTable");
  return knex.schema.dropTable("usersTable");
};
