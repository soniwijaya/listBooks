const mongoose = require('mongoose');
var schema = new mongoose.Schema({ 
  nama: String,
  email: String });
var User = mongoose.model('User', schema);

module.exports = User
