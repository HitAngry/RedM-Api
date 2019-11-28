const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const userRouter = require('./routes/user');
const inventoryRouter = require('./routes/inventory');
const resourceRouter = require('./routes/resource');
const craftRouter = require('./routes/craft');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', { useUnifiedTopology: true, useNewUrlParser: true }).
  catch(error => handleError(error));

const port = 8050;
const api = express();

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

api.use('/user', userRouter);
api.use('/craft', craftRouter);
api.use('/resource', resourceRouter);
api.use('/inventory', inventoryRouter);

api.listen(port, () => {
  console.log(`WestLaws API listening on ${port}`);
});