const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Favorites} = require('../models');

router.get('/', (req, res) => {
    User.findAll({
        attribute: [
            'id',
            'username',
            'email',
            'password'
        ],
        include: [
            {
                model: Favorites,
                attributes: ['id', 'fav_url', 'created_at']
            }
        ]
    }).then(dbData => {
      //  const favorites = dbData.map(favorites => favorites.get({plain: true}));

        res.render('login');
    });
});

module.exports = router;