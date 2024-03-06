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