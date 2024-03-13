const Ratings = require('../models/ratings');

// CRÉATION D'UN AVIS
exports.createRating = async (req, res) => {
    try {
        const newRating = await Ratings.create({
            rated: req.body.rated,
            avis: req.body.avis,
            logement_id: req.body.logement_id,
            reservation_id: req.body.reservation_id,
            users_id: req.body.users_id
        });
        res.status(201).json({
            status: 'success',
            data: {
                rating: newRating
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    };
};

// RÉCUPÉRATION DE TOUS LES RATINGS
exports.getAllRatings = async (req, res) => {
    try {
        const allRatings = await Ratings.findAll();
        res.status(200).json({
            status: 'success',
            results: allRatings.length,
            data: {
                allRatings
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// RÉCUPÉRATION D'UN RATING
exports.getRating = async (req, res) => {
    try {
        const rating = await Ratings.findOne({
            where: { id: req.params.id }
        });

        if (!rating) {
            return res.status(404).send('Avis non trouvé');
        }

        res.status(200).json({
            status: 'succes',
            data: {
                rating
            }
        });
    } catch (err) {
        console.err('Erreur lors de la récupération du rating')
    }
};

// SUPPRESSION D'UN RATING
exports.deleteRating = async (req, res) => {
    try {
        const deletedRating = await Ratings.destroy({
            where: { id: req.params.id }
        });

        if (deletedRating === 0) {
            return res.status(404).send('Avis inexistant');
        }
        res.status(204).send();
    } catch (err) {
        console.err('Erreur lors de la suppression de l\'avis');
    }
};

// MISE À JOUR D'UNE RÉSERVATION
exports.updateAvis = async (req, res) => {
    try {
        const setRating = await Ratings.findOne({
            where: { id: req.params.id }
        });

        if (!setRating) {
            return res.status(404).send('Avis non trouvé');
        }

        await setRating.update(req.body, {
            runValidators: true });

            res.status(200).json({
                status: 'success',
                data: {
                    setRating
                }
            });
    } catch (err) {
        res.status(500).send(err.message)
    }
};