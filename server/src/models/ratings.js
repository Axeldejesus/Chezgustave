const { DataTypes } = require('sequelize');
const database = require('../database');


const Ratings = database.define('ratings', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        rated: {
            type: DataTypes.INTEGER(5)
        },
        avis: {
            type: DataTypes.STRING
        },
        logement_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'logements',
                key: 'id'
            }
        },
        reservations_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'reservations',
                key: 'id'
            }
        },
        users_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    },
    {
        database,
        modelName: 'Ratings',
        tableName: 'ratings'
    }
);

module.exports = Ratings;