const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const craftSchema = new Schema([{
  name: String,
  hash: String,
  icon: String,
  type: String,
  delay: Number,
  description: String,
  resources: [{
    id: Number,
    quantity: Number
  }]
}]);

module.exports = mongoose.model('crafts', craftSchema);