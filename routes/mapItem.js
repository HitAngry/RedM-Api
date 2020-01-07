const express = require('express');
const mapItemModel = require('../models/mapItem');
const router = express.Router();

router.get('/', (req, res) => {
  mapItemModel.find(function(err, mapItems) {
    if(err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(mapItems);
    }
  })
});


router.delete('/:id', (req, res) => {
  if(req.params){
    const { id } = req.params;
    if(!req.params) {
      res.sendStatus(400);
    } else {
      mapItemModel.deleteOne({ _id: id }, function(err) {
        if(err) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

router.post('/', (req, res) => {  
  if(req.body) {
    const { name, icon, resourceId, description, qty, hash, position } = req.body;    
    if(!position || (!name || !icon || !hash) && (!resourceId || !qty)) {      
      res.sendStatus(400);
    } else {      
      const mapItem = new mapItemModel({
        name,
        icon,
        resourceId,
        description,
        qty,
        hash,
        position,
      });
      mapItem.save(function(err, resource) {
        if(err) {
          res.sendStatus(400);
        } else {          
          res.status(200).send(mapItem);
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;