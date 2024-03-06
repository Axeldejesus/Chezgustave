const Logements = require('./logements');
const Equipements = require('./equipements');

Logements.belongsToMany(Equipements, {through: 'EquipementsLogements', as: 'equipementsLogements'});
Equipements.belongsToMany(Logements, {through: 'EquipementsLogements', as: 'equipementsLogements'});