let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let whitelistSchema = new Schema({
  steamId: String,
  discordId: String
});

module.exports = mongoose.model('whitelist', whitelistSchema);