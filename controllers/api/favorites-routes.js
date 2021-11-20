const router = require('express').Router();
const {User, Favorites} = require('../../models')
const withAuth = require('../../utils/auth');

const ping = require('ping');
//test
const pingList = async hosts => {
  let result = []
  for(let host of hosts){
      let res = await ping.promise.probe(host);
      // await resultPush(res);
      result.push(res);
  };
  // returnList(result)
  return result
};

//get all favorites
router.get("/", (req, res) => {
    Favorites.findAll({
      attributes: [ 'id', 'fav_url', 'title'], // change attribute to match Favorite model
      include: [
          {
              model: User,
              attributes: ['username']
          }
      ]
    })
      .then(async (dbUserData) => {
        // ping sites here :)
        console.log(dbUserData)
        
        let pingResponse = await pingList(dbUserData)
        // console.log('this should be ping response favorites rout', pingResponse)
        // Object.assign(res, ...pingResponse)
        // looking for res.alive
          res.json(pingResponse)
          
        })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

//get single Favorite 
router.get("/:id", (req,res) => {
    Favorites.find({
      where: id = req.params.id,
      attributes: ['id', 'fav_url', 'title'],
      include: [
        {
          model: User,
          attribute: ['username']
        }
    ]
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
})

//post new favorites
router.post('/', withAuth, (req, res) => {
    Favorites.create({
        title: req.body.title,
        fav_url: req.body.fav_url,
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
    Favorites.update(
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
    Favorites.destroy({
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
