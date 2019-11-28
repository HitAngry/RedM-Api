const express = require('express');
const router = express.Router();
const inventoryModel = require('../models/inventory');

router.get('/:id', (req, res) => {
  if(req.params) {
    const { id } = req.params;
    if(!id) {
      res.sendStatus(400);
    } else {
      inventoryModel.find({userId: id}, function(err, inventory) {
        if(err) {
          res.sendStatus(400);
        } else {
          if(inventory.length > 0) {
            res.status(200).send(inventory);
          } else {
            res.sendStatus(404);
          }
        }
      });
    }
  }
});

module.exports = router;