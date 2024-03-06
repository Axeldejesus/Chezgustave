const { DataTypes } = require('sequelize');
const database = require('../database');

const Reservations = database.define('reservations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        chef_cuisine: {
            type: DataTypes.BOOLEAN
        },
        visite: {
            type: DataTypes.DATE
        },
        logement_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'logements',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        rating_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ratings',
                key: 'id'
            }
        }
    },
    {
        database,
        modelName: 'Reservations',
        tableName: 'reservations'
    }
);

module.exports = Reservations;