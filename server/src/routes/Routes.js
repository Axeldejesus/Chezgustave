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


// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ error: 'Invalid password' });
      }
      res.json({ message: 'User successfully logged in' });
    } catch (e) {
      res.status(500).json(e);
    }
});

// c'est pour cree un admin si besoin
// // Créer un utilisateur
// router.post('/users', async (req, res) => {
//     const { email, name, tel, password, is_admin } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     try {
//       const user = await User.create({ email, name, tel, password: hashedPassword, is_admin });
      
//       // Créer un token pour l'utilisateur
//       const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, 'YOUR_SECRET_KEY');
      
//       // Afficher le token dans la console
//       console.log(token);

//       res.json(user);
//     } catch (e) {
//       res.status(500).json(e);
//     }
// });


// Créer un utilisateur
router.post('/users', authenticate, requireAdmin, async (req, res) => {
    const { email, name, tel, is_admin } = req.body;

    const randomPassword = Math.floor(100000 + Math.random() * 900000);

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
router.get('/users', authenticate, requireAdmin, async (req, res) => {
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
  router.put('/users/:id',  async (req, res) => {
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
  router.delete('/users/:id', authenticate, requireAdmin,  async (req, res) => {
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
  const transaction = await database.transaction();
  try {
    const logementData = req.body;
    if (req.files && req.files.length > 0) { 
      logementData.images = req.files.map((file, index) => {
        // Renommer le fichier
        const oldPath = file.path;
        const newPath = path.join(path.dirname(oldPath), req.body.secteur + '-' + "img" + index + path.extname(file.originalname));
        fs.renameSync(oldPath, newPath);
        return 'http://localhost:3630/' + newPath;
      });
    }
    const logement = await Logement.create(logementData, { transaction });
    if (Array.isArray(req.body.equipements)) {
      const equipments = await Promise.all(req.body.equipements.map(id => Equipment.findByPk(id, { transaction })));
      for (let equipment of equipments) {
        await logement.addEquipment(equipment, { transaction });
      }
    }
    await transaction.commit();
    // Rechargez le logement avec les équipements inclus
    const result = await Logement.findByPk(logement.id, { include: Equipment });
    res.json(result);
  } catch (e) {
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
router.put('/logements/:id', async (req, res) => {
  console.log('Received PUT request for logement:', req.params.id);
  const transaction = await database.transaction();
  try {
    const logement = await Logement.findByPk(req.params.id, { transaction });
    if (logement) {
      console.log('Found logement:', logement);
      await logement.update(req.body, { transaction });
      if (req.body.equipements) {
        console.log('Updating equipements for logement:', req.body.equipements);
        
        const newEquipments = await Promise.all(req.body.equipements.map(id => Equipment.findByPk(id, { transaction })));
        console.log('New equipments:', newEquipments.map(e => e.id));
        
        await logement.setEquipment(newEquipments, { transaction });
        console.log('Updated equipments for logement');
        
        await logement.reload({ include: Equipment });
        console.log('Reloaded logement with new equipements');
      }
      await transaction.commit();
      console.log('Transaction committed');
      const result = await Logement.findByPk(logement.id, { include: Equipment });
      res.json(result);
    } else {
      console.log('Logement not found:', req.params.id);
      await transaction.rollback();
      res.status(404).json({ message: 'Logement non trouvé' });
    }
  } catch (e) {
    console.log('Error:', e);
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

//   // route pour recuperer les reservations d'un utilisateur 
//   router.get('/reservations/count', async (req, res) => {
//     try {
//       const allLogements = await logements.findAll();
//       let countWithoutReservation = 0;
  
//       for (let logement of allLogements) {
//         const reservationCount = await Reservation.count({ 
//           where: { logementId: logement.id } 
//         });
  
//         if (reservationCount === 0) {
//           countWithoutReservation++;
//         }
//       }
  
//       const countWithReservation = await Reservation.count({ 
//         distinct: true, 
//         col: 'logementId' 
//       });
  
//       res.json({ 
//         countWithReservation, 
//         countWithoutReservation 
//       });
//     } catch (e) {
//       res.status(500).json({ error: 'Une erreur est survenue lors de la récupération du nombre de logements.' });
//     }
//   });
  
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