const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const favoritesRoutes = require('./favorites-routes.js');

router.use('/user', userRoutes);
router.use('/favorites', favoritesRoutes);

module.exports = router;