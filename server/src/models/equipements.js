const { DataTypes } = require('sequelize');
const database = require('../database');

const Equipements = database.define('equipements', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        database,
        modelName: 'Equipements',
        tableName: 'equipements'
    }
);

module.exports = Equipements;