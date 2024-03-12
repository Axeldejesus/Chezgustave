const { DataTypes } = require('sequelize');
const database = require('../database');

const Rating = database.define('rating', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rated: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  text: {
    type: DataTypes.STRING
  },
  logementId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'logements', // nom de la table, pas du modèle
      key: 'id'
    }
  },
  reservationId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'reservations', // nom de la table, pas du modèle
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // nom de la table, pas du modèle
      key: 'id'
    }
  }
});

module.exports = Rating;