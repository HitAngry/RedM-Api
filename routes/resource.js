const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200);
});

router.post('/', (req, res) => {
  if(req.body) {
    const {name, icon, description} = req.body;
    if(!name || !icon || !description) {
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