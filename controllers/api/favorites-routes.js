const router = require('express').Router();
const Favorite = require('../../models')

//get all favorites
router.get("/", (req, res) => {
    Favorite.findAll({
      attributes: [ 'id', 'fav_url', 'title'], // change attribute to match Favorite model
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
    })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get single Favorite 


//post new favorites
router.post('/', withAuth, (req, res) => {
    Favorite.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update favorites
router.put('/:id', withAuth, (req, res) => {
    Favorite.update(
        {
          title: req.body.title
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No data found with this id'});
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });


//destroy favorites

router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Favorite.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
