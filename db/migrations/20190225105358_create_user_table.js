exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', (usersTable) => {
    console.log('creating usersTable');
    usersTable.string('username').primary();
    usersTable.string('avatar_url');
    usersTable.string('name');
  });
};

exports.down = function (knex, Promise) {
  console.log('removing users');
  return knex.schema.dropTable('users');
};

// to get this type in the terminal npm run migrate:make create_(name of table)
