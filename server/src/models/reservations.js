const { DataTypes } = require('sequelize');
const database = require('../database');

const Reservation = database.define('reservation', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  visite: {
    type: DataTypes.DATE
  },
  logementId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'logements', // nom de la table, pas du modèle
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users', // nom de la table, pas du modèle
      key: 'id'
    }
  },
  ratingId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ratings', // nom de la table, pas du modèle
      key: 'id'
    }
  }
});

module.exports = Reservation;