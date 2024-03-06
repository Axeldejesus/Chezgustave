const Reservation = require('../models/reservations');

// CRÉATION D'UNE RÉSERVATION
exports.createResa = async (req, res) => {
    try {
        const newResa = await Reservation.create({
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