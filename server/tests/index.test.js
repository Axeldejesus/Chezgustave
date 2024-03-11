const supertest = require('supertest');
const app = require('../src/app'); 
const database = require('../src/database'); 

describe('Equipment tests', () => {

    beforeAll(async () => {
        // INIT
        await database.authenticate();
        await database.sync({ force: true });
    });

    it('Should create a new equipment', async () => {
        const newEquipment = {
            name: 'TestEquipment',
        };

        const response = await supertest(app)
            .post('/equipements')
            .send(newEquipment);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(newEquipment.name);
    });

    it('Should delete the created equipment', async () => {
        const newEquipment = {
            name: 'TestEquipmentToDelete',
        };

        // Create a new equipment
        let response = await supertest(app)
            .post('/equipements')
            .send(newEquipment);

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe(newEquipment.name);

        // Delete the created equipment
        response = await supertest(app)
            .delete(`/equipements/${response.body.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Équipement supprimé');
    });

    afterAll(async () => {
        await database.close();
    });

});