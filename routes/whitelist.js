const express = require('express');
const router = express.Router();
const whitelistModel = require('../models/whitelist');

router.get('/:steamId', (req, res) => {
  if(req.params) {
    const { steamId } = req.params;
    if(!steamId) {
      res.sendStatus(400);
    } else {
      whitelistModel.find({steamId: steamId}, function(err, steamId) {
        if(err) {
          res.sendStatus(400);
        } else {
          if(steamId.length > 0) {
            res.status(200).send(steamId);
          } else {
            res.sendStatus(404);
          }
        }
      });
    }
  }
});

router.delete('/:steamId', (req, res) => {
  if(req.params){
    const { steamId } = req.params;
    if(!req.params) {
      res.sendStatus(400);
    } else {
      whitelistModel.deleteOne({steamId: steamId}, function(err) {
        if(err) {
          res.sendStatus(404);
        } else {
          res.status(200).send(`${steamId} has been delete`);
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

router.post('/', (req, res) => {
  if(req.body) {
    const { steamId } = req.body;
    if(!steamId) {
      res.sendStatus(400);
    } else {
      whitelistModel.findOne({steamId: steamId}, function(err, whitelist) {
        if(err) {
          res.sendStatus(400);
        } else {
          if(whitelist !== null) {
            res.status(200).send(`${whitelist.steamId} is already whitelisted`);
          } else {
            let whitelist = new whitelistModel({
              steamId: steamId
            });
            whitelist.save(function(err, whitelist) {
              if(err) {
                res.sendStatus(400);
              } else {
                res.status(200).send(`${whitelist.steamId} has been whitlisted`);
              }
            });
          }
        }
      })
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;