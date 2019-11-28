let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  steamId: String,
  isAlive: Boolean,
  firstName: String,
  lastName: String,
  groupId: String,
  money: Array,
  jobs: Array,
  skin: Object,
});

module.exports = mongoose.model('User', userSchema);