const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mapItemSchema = new Schema([{
  // unique item
  name: String,
  description: String,
  hash: String,
  icon: String,
  // or group of resources
  resourceId: String,  
  qty: Number,
  
  position: {
    x: Number,
    y: Number,
    z: Number,
  },
}]);

// mapItemSchema.methods.doSomething = function() {

// };

module.exports = mongoose.model('mapItems', mapItemSchema);

