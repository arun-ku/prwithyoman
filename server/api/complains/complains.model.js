'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ComplainsSchema = new Schema({
  title : String,
  content : String,
  category : String,
  fireDate : String,
  status : {
    code : {type : String, default : '0'},
    description : {type : String, default : 'Pending'}
  },
  imageUrl : String,
  user : {
    userId : String,
    name : String,
    imageUrl : String
  }
});

module.exports = mongoose.model('Complains', ComplainsSchema);
