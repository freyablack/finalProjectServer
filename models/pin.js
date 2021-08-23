const db = require('../db');
const {DataTypes} = require('sequelize');

const Pin = db.define('pin', {
  pinName: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  size: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  pinType: {
    type: DataTypes.STRING(4),
    allowNull: false,
  },
  condition: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  owner: {
    type: DataTypes.STRING
  }
})

module.exports = Pin