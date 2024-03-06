const app = require('../src/app');
const database = require('../src/database');
const supertest = require('supertest');

describe('Logements tests', () => {

    beforeAll(async () => {
        // INIT
        await database.authenticate();
        await database.sync({ force: true });
    });

    it('Should create a new logement', async () => {
        const newLogement = {
            secteur: 'Test Secteur',
            // Ajoutez ici les autres propriétés du logement
        };

        const response = await supertest(app)
            .post('/logements')
            .send(newLogement);

        expect(response.statusCode).toBe(200); // Change this to the status code your API returns
        expect(response.body.secteur).toBe(newLogement.secteur); // Change this to the value your API returns
        // Ajoutez ici d'autres vérifications pour les autres propriétés du logement
    }, 10000);

    afterAll(async () => {
        // CLEANUP
        await database.close();
    });

});