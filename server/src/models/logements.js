const { DataTypes } = require('sequelize');
const database = require('../database');
const Equipements = require('./equipements');

const Logements = database.define('logements', {
    name: {
      type: DataTypes.STRING
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    secteur: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT
    },
    tarif_bas: {
      type: DataTypes.FLOAT
    },
    tarif_moyen: {
      type: DataTypes.FLOAT
    },
    tarif_haut: {
      type: DataTypes.FLOAT
    },
    m_carre: {
      type: DataTypes.FLOAT
    },
    chambre: {
      type: DataTypes.INTEGER
    },
    salle_de_bain: {
      type: DataTypes.INTEGER
    },
    categorie: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    equipements: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },
  {
    database,
    modelName: 'Logements',
    tableName: 'logements'
  }
);

module.exports = Logements;