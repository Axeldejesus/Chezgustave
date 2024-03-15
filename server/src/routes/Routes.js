const { Router } = require('express');
const router = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticate, requireAdmin } = require('../middlewares/usersMiddlewares');
const Logement = require('../models/logements');
const Reservation = require('../models/reservations');
const Rating = require('../models/ratings');
const User = require('../models/users');
const Equipment = require('../models/equipements');
const sendEmail = require('../middlewares/mailMiddlewares');
const database = require('../database');
const upload = require('../middlewares/imageMiddlewares');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Op } = require('sequelize');
const crypto = require('crypto');


// login rowan c'est mieux
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Received request : ", req.method, req.url, req.headers, req.body);
  const user = await User.findOne({ where: { email } });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id, is_admin: user.is_admin, name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('jwtToken', token, { httpOnly: true, secure: true });
    res.json({ message: "Connexion réussie", token, user });
  } else {
    res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
  }
});

// Déconnexion c'est toujours mieux 
router.get('/logout', (req, res) => {
  res.clearCookie('jwtToken');
  res.json({ message: "Déconnexion réussie !" });
});



//Créer un utilisateur
router.post('/users', async (req, res) => {
  const { email, name, tel, is_admin } = req.body;

  const randomPassword = crypto.randomBytes(20).toString("base64");

  const hashedPassword = await bcrypt.hash(randomPassword.toString(), 10);
  try {
    const user = await User.create({ email, name, tel, password: hashedPassword, is_admin });

    // Générer un token pour l'utilisateur avec une expiration de 24 heures
    const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, 'YOUR_SECRET_KEY', { expiresIn: '24h' });

    // Afficher le token dans la console
    console.log(token);

    sendEmail(email, 'Me gusta paella', `Bonjour ${name}, bienvenue sur notre plateforme! Ton mot de passe: ${randomPassword}`);

    // Retourner l'utilisateur avec son token
    res.json({ ...user.toJSON(), token });
  } catch (e) {
    res.status(500).json(e);
  }
});


// Récupérer tous les utilisateurs (seulement pour les admins)
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();

    const usersWithTokens = users.map(user => {
      // Générer un nouveau token pour l'utilisateur
      const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, 'YOUR_SECRET_KEY');

      // Retourner l'utilisateur avec son token
      return { ...user.toJSON(), token };
    });

    res.json(usersWithTokens);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Mettre à jour un utilisateur
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, tel, password } = req.body;

  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const updateData = { email, name, tel };
    if (hashedPassword) {
      updateData.password = hashedPassword;
    }

    const [updated] = await User.update(updateData, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Supprimer un utilisateur (seulement pour les admins)
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer les détails de la réservation d'un utilisateur
router.get('/users/:id/reservations', async (req, res) => {
  try {
    const userId = req.params.id;
    const userReservations = await Reservation.findAll({
      where: { userId: userId }
    });

    res.json(userReservations);
  } catch (e) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des réservations.' });
  }
});



// Créer un équipement
router.post('/equipements', async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.json(equipment);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer tous les équipements
router.get('/equipements', async (req, res) => {
  try {
    const allEquipments = await Equipment.findAll();
    res.json(allEquipments);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer les détails d'un équipement spécifique
router.get('/equipements/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Mettre à jour un équipement spécifique
router.put('/equipements/:id', async (req, res) => {
  try {
    const [updated] = await Equipment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEquipment = await Equipment.findByPk(req.params.id);
      res.json(updatedEquipment);
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Supprimer un équipement spécifique
router.delete('/equipements/:id', async (req, res) => {
  try {
    const deleted = await Equipment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Équipement supprimé' });
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});




// Créer un logement
router.post('/logements', upload.any(), async (req, res) => {
  // This const allows to make a transaction so that if an error occurs, we can cancel all operations
  const transaction = await database.transaction();
  // The try block allows to manage all the logic of creating a housing and its associated equipments
  try {
    const logementData = req.body;
    // The if block allows to manage the images of the housing and to store them in the uploads folder
    if (req.files && req.files.length > 0) {
      logementData.images = req.files.map((file, index) => {
        const oldPath = file.path;
        const newPath = path.join(path.dirname(oldPath), req.body.secteur + '-' + "img" + index + path.extname(file.originalname));
        fs.renameSync(oldPath, newPath);
        return 'http://' + req.hostname + ':' + (process.env.PORT || 3630) + '/' + newPath;
      });
    }
    
    // The logement const allows to create a housing with the received data
    const logement = await Logement.create(logementData, { transaction });
    // The if statement allows to manage the equipments associated with the housing
    if (Array.isArray(req.body.equipements)) {
      const equipments = await Promise.all(req.body.equipements.map(async id => {
        const equipment = await Equipment.findByPk(id, { transaction });
        if (!equipment) {
          throw new Error(`Equipment with ID ${id} not found`);
        }

        return equipment;
      }));

      for (let equipment of equipments) {
        await logement.addEquipment(equipment, { transaction });
      }
    }
    // Validate all the operations carried out or to cancel them if an error occurs
    await transaction.commit();
    const result = await Logement.findByPk(logement.id, { include: Equipment });
    res.json(result);
  } catch (e) {
    // Cancel all the operations carried out if an error occurs
    await transaction.rollback();
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});

// Route pour récupérer les logements
router.get('/logements', async (req, res) => {
  try {
    const logements = await Logement.findAll({
      include: [{
        model: Equipment,
        as: 'equipment',
        through: { attributes: [] },
      }]
    });
    res.json(logements);
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});

// Récupérer les détails d'un logement spécifique
router.get('/logements/:id', async (req, res) => {
  try {
    const logement = await Logement.findByPk(req.params.id, {
      include: [{
        model: Equipment,
        as: 'equipment',
        through: { attributes: [] },
      }]
    });
    res.json(logement);
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});


// Mettre à jour un logement spécifique
router.put('/logements/:id', upload.any(), async (req, res) => {
  const transaction = await database.transaction();
  try {
    const logement = await Logement.findByPk(req.params.id, { transaction });
    if (logement) {
      if (req.files && req.files.length > 0) {
        logement.images.forEach(image => {
          const imagePath = path.join(__dirname, '..', 'uploads', path.basename(image));
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        });

        const newImages = req.files.map((file, index) => {
          const oldPath = file.path;
          const newPath = path.join(path.dirname(oldPath), req.body.secteur + '-' + "img" + index + path.extname(file.originalname));
          fs.renameSync(oldPath, newPath);
          return 'http://localhost:3630/' + newPath;
        });
        req.body.images = newImages;
      }

      await logement.update(req.body, { transaction });

      if (req.body.equipements) {
        const newEquipments = await Promise.all(req.body.equipements.map(id => Equipment.findByPk(id, { transaction })));
        await logement.setEquipment(newEquipments, { transaction });
        await logement.reload({ include: Equipment });
      }
      await transaction.commit();
      const result = await Logement.findByPk(logement.id, { include: Equipment });
      res.json(result);
    } else {
      await transaction.rollback();
      res.status(404).json({ message: 'Logement non trouvé' });
    }
  } catch (e) {
    await transaction.rollback();
    res.status(500).json({ error: e.message, stack: e.stack });
  }
});

// Supprimer un logement spécifique
router.delete('/logements/:id', async (req, res) => {
  try {
    const deleted = await Logement.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Logement supprimé' });
    } else {
      res.status(404).json({ message: 'Logement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer les détails de la réservation d'un logement
router.get('/logements/:id/reservations', async (req, res) => {
  try {
    const logementId = req.params.id;
    const logementReservations = await Reservation.findAll({
      where: { logementId: logementId }
    });

    res.json(logementReservations);
  } catch (e) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des réservations.' });
  }
});

// recupere un logement par son secteur
router.get('/logements/secteur/:secteur', async (req, res) => {
  try {
    const logement = await Logement.findAll({
      where: { secteur: { [Op.iLike]: req.params.secteur } }
    });
    if (logement) {
      res.json(logement);
    } else {
      res.status(404).json({ message: 'Logement not found' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// recupere un logement par son tarif ou autre 
router.post('/logements/search', async (req, res) => {
  try {
    const logements = await Logement.findAll({
      where: {
        [Op.or]: [
          { secteur: { [Op.iLike]: `%${req.body.secteur}%` } },
          { tarif_bas: { [Op.eq]: req.body.tarif_bas } },
          { tarif_moyen: { [Op.eq]: req.body.tarif_moyen } },
          { tarif_haut: { [Op.eq]: req.body.tarif_haut } }
        ]
      }
    });
    res.json(logements);
  } catch (e) {
    res.status(500).json(e);
  }
});


// Créer un équipement
router.post('/equipements', async (req, res) => {
  try {
    const equipment = await Equipment.create(req.body);
    res.json(equipment);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer tous les équipements
router.get('/equipements', async (req, res) => {
  try {
    const allEquipments = await Equipment.findAll();
    res.json(allEquipments);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer les détails d'un équipement spécifique
router.get('/equipements/:id', async (req, res) => {
  try {
    const equipment = await Equipment.findByPk(req.params.id);
    if (equipment) {
      res.json(equipment);
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Mettre à jour un équipement spécifique
router.put('/equipements/:id', async (req, res) => {
  try {
    const [updated] = await Equipment.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEquipment = await Equipment.findByPk(req.params.id);
      res.json(updatedEquipment);
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Supprimer un équipement spécifique
router.delete('/equipements/:id', async (req, res) => {
  try {
    const deleted = await Equipment.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Équipement supprimé' });
    } else {
      res.status(404).json({ message: 'Équipement non trouvé' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});



// Créer une note
router.post('/ratings', async (req, res) => {
  try {
    const rating = await Rating.create(req.body);
    res.json(rating);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer toutes les notes
router.get('/ratings', async (req, res) => {
  try {
    const allRatings = await Rating.findAll();
    res.json(allRatings);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer les détails d'une note spécifique
router.get('/ratings/:id', async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (rating) {
      res.json(rating);
    } else {
      res.status(404).json({ message: 'Note non trouvée' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Mettre à jour une note spécifique
router.put('/ratings/:id', async (req, res) => {
  try {
    const [updated] = await Rating.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedRating = await Rating.findByPk(req.params.id);
      res.json(updatedRating);
    } else {
      res.status(404).json({ message: 'Note non trouvée' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Supprimer une note spécifique
router.delete('/ratings/:id', async (req, res) => {
  try {
    const deleted = await Rating.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Note supprimée' });
    } else {
      res.status(404).json({ message: 'Note non trouvée' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});




// Créer une réservation
router.post('/reservations', async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).json(reservation);
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer toutes les réservations
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (e) {
    res.status(500).json(e);
  }
});


// Récupérer les détails de la réservation 1
router.get('/reservations/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Mettre à jour les détails de la réservation 1
router.put('/reservations/:id', async (req, res) => {
  try {
    const [updated] = await Reservation.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedReservation = await Reservation.findByPk(req.params.id);
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Supprimer la réservation 
router.delete('/reservations/:id', async (req, res) => {
  try {
    const deleted = await Reservation.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).json({ message: 'Reservation deleted' });
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

// Récupérer les détails de la note d'une réservation
router.get('/reservations/:id/ratings', async (req, res) => {
  try {
    const reservationId = req.params.id;
    const ratings = await Rating.findAll({
      where: { reservationId: reservationId }
    });

    res.json(ratings);
  } catch (e) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des notes.' });
  }
});


module.exports = router;