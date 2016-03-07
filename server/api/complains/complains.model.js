'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComplainsSchema = new Schema({
  title : String,
  content : String,
  category : String,
  fireDate : String,
  status : {type : String, default : 'Pending'},
  user : {
    userId : String,
    name : String,
    imageUrl : String
  }
});

module.exports = mongoose.model('Complains', ComplainsSchema);
