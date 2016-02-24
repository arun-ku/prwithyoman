'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  category : {type : String, default : 'BUZZ'},
  user : {
    id : String,
    name : String,
    imageUrl : String
  },
  imageUrl : String,
  content : String,
  buzzDate : String
});

module.exports = mongoose.model('Post', PostSchema);
