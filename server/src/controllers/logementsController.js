const Logements = require('../models/logements');

// CRÉATION D'UN LOGEMENT
exports.createLogi = async (req, res) => {
    try {
        const newLogi = await Logements.create({
            images: req.body.images,
            secteur: req.body.secteur,
            description: req.body.description,
            tarif_bas: req.body.tarif_bas,
            tarif_moyen: req.body.tarif_moyen,
            tarif_haut: req.body.tarif_haut,
            m_carre: req.body.m_carre,
            chambre: req.body.chambre,
            salle_de_bain: req.body.salle_de_bain,
            categorie: req.body.categorie,
            type: req.body.type,
            equipements: req.body.equipements
        });
        res.status(201).json({
            status: 'success',
            data: {
                logi: newLogi
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    };
};

// RÉCUPÉRATION DES LOGEMENTS
exports.getAllLogi = async (req, res) => {
    try {
        const allLogi = await Logements.findAll()
        res.status(200).json({
            satus: 'success',
            resulsts: allLogi.length,
            data: {
                allLogi
            }
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        });
    };
};

// RÉCUPÉRATION D'UN LOGEMENT
exports.getLogi = async (req, res) => {
    try {
        const logi = await Logements.findOne({
            where: { id: req.params.id }
        });
        if (!logi) {
            return res.status(404).send('Logement non trouvé');
        }

        res.status(200).json({
            status: 'success',
            data: {
                logi
            }
        });
    } catch (err) {
        console.err('Erreur lors de la récupération du logement : ', err);
        res.status(500).send('Erreur lors de la récupération du logement');
    }
};

// SUPPRESSION D'UN LOGEMENT
exports.deleteLogi = async (req, res) => {
    try {
        const deletedLogement = await Logements.destroy({
            where: { id: req.params.id }
        });

        if (deletedLogement === 0) {
            return res.status(404).send('Logement inexistant');
        }
        res.status(204).send();
    } catch (err) {
        console.err('Erreur lors de la suppression du logement');
    }
};

// MISE À JOUR DU LOGEMENT
exports.updateLogi = async (req, res) => {
    try {
        const setLogi = await Logements.findOne({
            where: { id: req.params.id }
        });

        if (!setLogi) {
            return res.status(404).send('Logement non trouvé');
        }

        await setLogi.update(req.body, { runValidators: true });

        res.status(200).json({
            status: 'success',
            data: {
                setLogi
            }
        });
    } catch (err) {
        res.status(500).send(err.message)
    }
};