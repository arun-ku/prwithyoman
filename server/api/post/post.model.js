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
  count : {
    likes : {type : Number, default: 0},
    dislikes : {type : Number, default: 0},
    neutrals : {type : Number, default: 0}
  },
  opinion : [{
    userId : String,
    name : String,
    imageUrl : String,
    category : String
  }],
  commentCount : {type : Number, default : 0}
});

module.exports = mongoose.model('Post', PostSchema);
