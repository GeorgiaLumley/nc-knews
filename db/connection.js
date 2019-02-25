const dbconfig = require("../knexfile");
const knex = require("knex");
const connection = knex(dbconfig);
module.exports = connection;
