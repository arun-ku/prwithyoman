'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  user : {
    userId : String,
    name : String,
    imageUrl : String
  },
  content : String,
  time : String
});

module.exports = mongoose.model('Comment', CommentSchema);
