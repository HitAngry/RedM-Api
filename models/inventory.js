let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let inventorySchema = new Schema([{
  userId: String,
  inventory: [{
    resourceId: Number, 
    quantity: Number,
    type: String
  }]
}]);

module.exports = mongoose.model('inventories', inventorySchema);