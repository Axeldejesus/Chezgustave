const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, 'YOUR_SECRET_KEY', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Failed to authenticate token" });
    }

    req.auth = decoded;
    next();
  });
};

// Middleware de contrôle de rôle
const requireAdmin = (req, res, next) => {
  if (!req.auth || !req.auth.is_admin) {
    return res.status(403).json({
      error: "Admin resource! Access denied."
    });
  }
  next();
};

module.exports = {
  authenticate,
  requireAdmin
};