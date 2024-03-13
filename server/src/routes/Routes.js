const { Router } = require('express');
const router = Router();
const usersController = require('../controllers/usersController');
const reservationsController = require('../controllers/reservationsController');
const logementsController = require('../controllers/logementsController');
const equipementsController = require('../controllers/equipementsController');
const ratingsController = require('../controllers/ratingsController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const logements = require('../models/logements');
const reservations = require('../models/reservations');
const ratings = require('../models/ratings');
const users = require('../models/users');
const equipements = require('../models/equipements');
const { allowedRolesUser } = require('../config/rolesConfig');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

// _________________________________________ROUTES USERS_________________________________________ \\
router.post('/users', protect, restrictTo(...allowedRolesUser), usersController.createUser);
router.get('/users', protect, restrictTo(...allowedRolesUser), usersController.getAllUsers);
router.get('/users/:id', protect, restrictTo(...allowedRolesUser), usersController.getUser);
router.put('/users/:id', protect, restrictTo(...allowedRolesUser), usersController.updateUser);
router.delete('/users/:id', protect, restrictTo(...allowedRolesUser), usersController.deleteUser);

// ______________________________________ROUTES RÉSERVATIONS______________________________________ \\
router.post('/reservations', protect, restrictTo(...allowedRolesUser), reservationsController.createResa);
router.get('/reservations', protect, restrictTo(...allowedRolesUser), reservationsController.getAllResa);
router.get('/reservations/:id', protect, restrictTo(...allowedRolesUser), reservationsController.getResa);
router.put('/reservations/:id', protect, restrictTo(...allowedRolesUser), reservationsController.updateResa);
router.delete('/reservations/:id', protect, restrictTo(...allowedRolesUser), reservationsController.deleteResa);

// ________________________________________ROUTES lOGEMENTS________________________________________ \\
router.post('/logements', protect, restrictTo(...allowedRolesUser), logementsController.createLogi);
router.get('/logements', protect, restrictTo(...allowedRolesUser), logementsController.getAllLogi);
router.get('/logements/:id', protect, restrictTo(...allowedRolesUser), logementsController.getLogi);
router.put('/logements/:id', protect, restrictTo(...allowedRolesUser), logementsController.updateLogi);
router.delete('/logements/:id', protect, restrictTo(...allowedRolesUser), logementsController.deleteLogi);

// _______________________________________ROUTES ÉQUIPEMENTS_______________________________________ \\
router.post('/equipements', protect, restrictTo(...allowedRolesUser), equipementsController.createEqui);
router.get('/equipements', protect, restrictTo(...allowedRolesUser), equipementsController.getAllEqui);
router.get('/equipements/:id', protect, restrictTo(...allowedRolesUser), equipementsController.getEqui);
router.put('/equipements/:id', protect, restrictTo(...allowedRolesUser), equipementsController.updateEqui);
router.delete('/equipements/:id', protect, restrictTo(...allowedRolesUser), equipementsController.deleteEqui);

// _________________________________________ROUTES RATINGS_________________________________________ \\
router.post('/ratings', protect, restrictTo(...allowedRolesUser), ratingsController.createRating);
router.get('/ratings', protect, restrictTo(...allowedRolesUser), ratingsController.getAllRatings);
router.get('/ratings', protect, restrictTo(...allowedRolesUser), ratingsController.getRating);
router.put('/ratings/:id', protect, restrictTo(...allowedRolesUser), ratingsController.updateAvis);
router.delete('/ratings/:id', protect, restrictTo(...allowedRolesUser), ratingsController.deleteRating);




router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    console.log("Received request : ", req.method, req.url, req.headers, req.body);
    const user = await users.findOne({ where: { name: name } });

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id, is_admin: user.is_admin, name: user.name }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.cookie('jwtToken', token, { httpOnly: true, secure: true});
        res.json({ message: "Connexion réussie", token, user });
    } else {
        res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('jwtToken');
    res.json({ message: "Déconnexion réussie !" });
});







module.exports = router;