const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/user');

router.get('/:id', (req, res) => {
  if(req.params.id) {
    console.log(req.params.id);
    res.sendStatus(200);

  } else {
    res.sendStatus(400);
  }
});

router.post('/', (req, res) => {
  if(req.body) {
    const {steamId, firstName, lastName} = req.body;
    if(!steamId || !firstName || !lastName) {
      res.sendStatus(400);
    } else {
      console.log(steamId, firstName, lastName);
      res.sendStatus(200);
    }
  } else {
    res.sendStatus(400);
  }
})

module.exports = router;