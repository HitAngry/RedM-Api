const express = require('express');
const router = express.Router();

router.get('/:id/:token', (req, res) => {
  if(req.params.id && req.params.token) {

  }
  // return inventory of id player if token is good
  res.sendStatus(200);
});

router.put('/:id/:token')

module.exports = router;