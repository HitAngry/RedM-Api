const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapItemSchema = new Schema([{
  name: String,
  resourceId: String,
  description: String,
  qty: Number,
  hash: String,
  icon: String,
  position: {
    x: Number,
    y: Number,
    z: Number,
  },
}]);

// mapItemSchema.methods.doSomething = function() {

// };

module.exports = mongoose.model('mapItems', mapItemSchema);

