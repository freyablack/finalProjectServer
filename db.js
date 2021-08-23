const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:@localhost:5432/final-project')

module.exports = sequelize