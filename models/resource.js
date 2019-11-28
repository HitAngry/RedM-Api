let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let resourceSchema = new Schema([{
  name: String,
  icon: String,
  description: String
}]);

module.exports = mongoose.model('Resource', resourceSchema);