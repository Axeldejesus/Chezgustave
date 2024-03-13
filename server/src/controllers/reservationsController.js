const Reservations = require('../models/reservations');

// CRÉATION D'UNE RÉSERVATION
exports.createResa = async (req, res) => {
    try {
        const newResa = await Reservations.create({
            start_date: req.body.start_date,
            end_date: req.body.end_date,
            chef_cuisine: req.body.chef_cuisine,
            visite: req.body.visite,
            logement_id: req.body.logement_id,
            user_id: req.body.user_id,
            rating_id: req.body.rating_id
        });
        res.status(201).json({
            status: 'success',
            data: {
                resa: newResa
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    };
};

// RÉCUPÉRATION DE TOUTES LES RÉSERVATIONS
exports.getAllResa = async (req, res) => {
    try {
        const allResa = await Reservations.findAll();
        res.status(200).json({
            status: 'success',
            results: allResa.length,
            data: {
                allResa
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// RÉCUPÉRATION D'UNE RÉSERVATION
exports.getResa = async (req, res) => {
    try {
        const resa = await Reservations.findOne({
            where: { id: req.params.id }
        });

        if (!resa) {
            return res.status(404).send('Réservation non trouvée');
        }

        res.status(200).json({
            status: 'success',
            data: {
                resa
            }
        });
    } catch (err) {
        console.err('Erreur lors de la récupération de la réservation');
        res.status(500).send('Erreur lors de la récupération de la réservation')
    }
};

// SUPPRESSION D'UNE RÉSERVATION
exports.deleteResa = async (req, res) => {
    try {
        const deletedResa = await Reservations.destroy({
            where: { id: req.params.id }
        });

        if (deletedResa === 0) {
            return res.status(404).send('Réservation inexistante');
        }
        res.status(204).send();
    } catch (err) {
        console.err('Erreur lors de la suppression de la réservation');
        res.status(500).send('Erreur lors de la suppression de la réservation');
    }
};

// MISE À JOUR D'UNE RÉSERVATION
exports.updateResa = async (req, res) => {
    try {
        const setResa = await Reservations.findOne({
            where: { id: req.params.id }
        });

        if (!setResa) {
            return res.status(404).send('Réservation non trouvé');
        }

        await setResa.update(req.body, { runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                setResa
            }
        });
    } catch (err) {
        res.status(500).send(err.message)
    }
};