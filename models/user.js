let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  steamId: String,
  isAlive: { type: Boolean, default: true },
  firstName: String,
  lastName: String,
  money: [Number],
  jobs: Array,
  skin: [Object],
});

module.exports = mongoose.model('users', userSchema);