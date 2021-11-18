const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Favorites } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'fav_url',
      'title',
      'created_at',
      
    ],
    include: [
      {
        model: Favorites,
        attributes: ['id', 'title', 'fav_url', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const favorites = dbPostData.map(favorites => favorites.get({ plain: true }));
      res.render('dashboard', { favorites, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});