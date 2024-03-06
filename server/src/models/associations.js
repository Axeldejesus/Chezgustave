const Logement = require('./logements');
const Equipment = require('./equipements');

Logement.belongsToMany(Equipment, { through: 'LogementEquipment' });
Equipment.belongsToMany(Logement, { through: 'LogementEquipment' });

