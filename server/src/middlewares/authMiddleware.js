const jwt = require('jsonwebtoken');
const Users = require('../models/users');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else {
            return res.status(401).json({
                status: 'fail',
                message: 'Vous n\'êtes pas connecté'
            });
        }

        console.log('Token extrait : ', token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token décodé : ', decoded);
        const currentUser = await Users.findOne({ where: { name: decoded.name } });
        console.log('Utilisateur actuel : ', currentUser);

        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'L\'utilisateur appartenant à ce token n\'existe plus'
            });
        }
        req.user = currentUser;
        next();
    } catch (err) {
        console.error('Erreur dans le middleware protect : ', err);
        return res.status(401).json({
            status: 'fail',
            message: 'Token invalide ou expiré'
        });
    };
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log('Rôle de l\'utilisateur actuel (admin) : ', req.user.is_admin);
        if (!req.user.is_admin) {
            return res.status(403).json({
                status: 'fail',
                message: 'Vous n\'avez pas la permission d\'effectuer cette action'
            });
        }
        next();
    };
};