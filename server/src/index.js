const app = require('./app');
const database = require('./database');

// Importez vos modèles avant d'importer vos associations
const Logement = require('./models/logements');
const Equipment = require('./models/equipements');

// Importez vos associations après vos modèles
require('./models/associations');

database.authenticate().then(() => {
    console.log('Connected to database!');
    // Appelez sync après avoir importé vos modèles et vos associations
    database.sync();
});

app.listen(process.env.PORT || 3630, () => {
    console.log('Server listening on 3630');
});