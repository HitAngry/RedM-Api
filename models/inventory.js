let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let inventorySchema = new Schema([{
  userId: String,
  inventory: [Object]
}]);

module.exports = mongoose.model('inventories', inventorySchema);