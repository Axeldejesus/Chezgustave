const Equipements = require('../models/equipements');

// CRÉATION D'UN ÉQUIPEMENT
exports.createEqui = async (req, res) => {
    try {
        const newEqui = await Equipements.create({
            name: req.body.name
        });
        res.status(201).json({
            status: 'success',
            data: {
                equi: newEqui
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    };
};

// RÉCUPÉRATION DE TOUS LES ÉQUIPEMENTS
exports.getAllEqui = async (req, res) => {
    try {
        const allEqui = await Equipements.findAll();
        res.status(200).json({
            status: 'success',
            results: allEqui.length,
            data: {
                allEqui
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// RÉCUPÉRATION D'UN ÉQUIPEMENT
exports.getEqui = async (req, res) => {
    try {
        const equi = await Equipements.findOne({
            where: { id: req.params.id }
        });

        if (!equi) {
            return res.status(404).send('Équipement non trouvé');
        }

        res.status(200).json({
            status: 'success',
            data: {
                equi
            }
        });
    } catch (err) {
        console.err('Erreur lors de la récupération de l\'équipement : ', err);
        res.status(500).send('Erreur lors de la récupération de l\'équipement');
    }
};

// SUPPRESSION D'UN ÉQUIPEMENT
exports.deleteEqui = async (req, res) => {
    try {
        const deletedEquipement = await Equipements.destroy({
            where: { id: req.params.id }
        });

        if (deletedEquipement === 0) {
            return res.status(404).send('Équipement inexistant');
        }
        res.stauts(204).send();
    } catch (err) {
        console.err('Erreur lors de la suppression de l\'équipement : ', err);
        res.status(500).send('Erreur lors de la suppression de l\'équipement');
    }
};

// MISE À JOUR D'UN ÉQUIPEMENT
exports.updateEqui = async (req, res) => {
    try {
        const setEqui = await Equipements.findOne({
            where: { id: req.params.id }
        });

        if (!setEqui) {
            return res.status(404).send('Équipement non trouvé');
        }

        await setEqui.update(req.body, { runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                setEqui
            }
        });
    } catch (err) {
        res.status(500).send(err.message)
    }
};