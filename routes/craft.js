const express = require('express');
const router = express.Router();
const craftModel = require('../models/craft');

router.get('/', (req, res) => {
  craftModel.find(function(err, crafts) {
    if(err) {
      return res.sendStatus(400);
    }

    return res.status(200).send(crafts);
  });
});

router.post('/', (req, res) => {
  if(req.body) {
    const {name, icon, description, delay, type, hash, resources } = req.body;
    if(!name || !icon || !description || !delay || !type || !hash || !resources) {
      res.sendStatus(400);
    } else {
      console.log(req.body);
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;