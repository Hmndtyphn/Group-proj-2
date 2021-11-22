const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Favorites } = require('../models');
const withAuth = require('../utils/auth');
const pingList = async hosts => {
  let result = hosts
  for(i = 0; i < hosts.length; i++){
      let res = await ping.promise.probe(hosts[i].fav_url, {
          numeric: true,
          min_reply: 1,
          extra: ['-i', '2']
      });
      // await resultPush(res);
      result[i].dataValues.favStatus = res.alive
  };
  // returnList(result)
  return result
};// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Favorites.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'fav_url',
      'title',
      'created_at'
      
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then( async (dbPostData) => { 
      let favStatus = await pingList(dbPostData);
      console.log(favStatus);
      const favorites = dbPostData.map(favorite => favorite.get({ plain: true }));
      res.render('dashboard', { favorites, favStatus, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Favorites.findByPk(req.params.id, {
    attributes: [
      'id',
      'fav_url',
      'title',
      'created_at'
    ],
    include: [ 
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const favorite = dbPostData.get({ plain: true });
        
        res.render('edit-favorite', {
          favorite,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
