const { DataTypes } = require('sequelize');
const database = require('../database');



const Equipment = database.define('equipment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Equipment;