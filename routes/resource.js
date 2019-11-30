const express = require('express');
const resourceModel = require('../models/resource');
const router = express.Router();

router.get('/', (req, res) => {
  resourceModel.find(function(err, resources) {
    if(err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(resources);
    }
  })
});

router.get('/:id', (req, res) => {
  if(req.params){
    const { id } = req.params;
    if(!req.params) {
      res.sendStatus(400);
    } else {
      resourceModel.findById(id, function(err, resource) {
        if(err || !resource) {
          res.sendStatus(404);
        } else {
          res.status(200).send(resource);
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

router.delete('/:id', (req, res) => {
  if(req.params){
    const { id } = req.params;
    if(!req.params) {
      res.sendStatus(400);
    } else {
      resourceModel.deleteOne({_id: id}, function(err) {
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
    const {name, icon, description} = req.body;
    if(!name || !icon || !description) {
      res.sendStatus(400);
    } else {
      let resource = new resourceModel({
        name: name,
        icon: icon,
        description: description
      });
      resource.save(function(err, resource) {
        if(err) {
          res.sendStatus(400);
        } else {
          console.log(`${resource.name} has been created`);
          res.sendStatus(200);
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;