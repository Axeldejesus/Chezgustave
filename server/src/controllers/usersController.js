const User = require('../models/users');

// CRÉATION D'UN UTILISATEUR
exports.createUser = async (req, res) => {
    try {
        const newUser = await User.create({

            email: req.body.email,
            name: req.body.name,
            tel: req.body.tel,
            password: req.body.password,
            is_admin: req.body.is_admin,
        });
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
        
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    };
};

// RÉCUPÉRATION DE TOUS LES UTILISATEURS
exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.findAll();
        res.status(200).json({
            status: 'success',
            results: allUsers.length,
            data: {
                allUsers
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    }
};

// RÉCUPÉRATION D'UN UTILISATEUR
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id }
        });

        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        });
    } catch (err) {
        console.err('Erreur lors de la récupération de l\'utilisateur : ', err);
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
    }
};

// SUPPRESSION D'UN UTILISATEUR
exports.deleteUser = async (req, res) => {
    try {
        const deletedUserCount = await User.destroy({
            where: { id: req.params.id }
        });

        if (deletedUserCount === 0) {
            return res.status(404).send('Utilisateur inexistant');
        }
        res.status(204).send();
    } catch (err) {
        console.err('Erreur lors de la suppression de l\'utilisateur : ', err);
        res.status(500).send('Erreur de la suppression de l\'utilisateur');
    }
};

// MISE À JOUR D'UN UTILISATEUR
exports.updateUser = async (req, res) => {
    try {
        const setUser = await User.findOne({
            where: { id: req.params.id }
        });

        if (!setUser) {
            return res.status(404).send('Utilisateur non trouvé');
        }

        await setUser.update(req.body, { runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                setUser
            }
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};