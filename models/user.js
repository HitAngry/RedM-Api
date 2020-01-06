let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  steamId: String,
  isAlive: { type: Boolean, default: true },
  firstName: String,
  lastName: String,
  money: Array,
  jobs: Array,
  skin: Array,
});

module.exports = mongoose.model('users', userSchema);