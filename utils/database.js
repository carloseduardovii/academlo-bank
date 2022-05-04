const { Sequelize } = require('sequelize');

const database = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'Abc1234*',
  database: 'academlo_bank',
  logging: false,
});

module.exports = { database };
