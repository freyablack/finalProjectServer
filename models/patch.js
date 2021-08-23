const db = require('../db');
const {DataTypes} = require('sequelize');

const Patch = db.define('patch', {
  patchName: {
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
  patchType: {
    type: DataTypes.STRING(20),
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

module.exports = Patch