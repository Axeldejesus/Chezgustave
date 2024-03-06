const app = require('./app');
const database = require('./database');
const Equipements = require('./models/equipements');
const Logements = require('./models/logements');

database.authenticate().then(() => {
    console.log('Connected to database!');
    // database.sync({ force: true });
    database.sync();
});

require('./models/associations');

app.listen(process.env.PORT, () => {
    console.log('Server listening on 3630');
});