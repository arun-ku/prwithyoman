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
  buzzDate : String,
  opinionCount : {
    likes : {type : Number, default: 0},
    dislikes : {type : Number, default: 0},
    neutral : {type : Number, default: 0}
  },
  opinion : [{
    name : String,
    imageUrl : String,
    category : String
  }]
});

module.exports = mongoose.model('Post', PostSchema);
