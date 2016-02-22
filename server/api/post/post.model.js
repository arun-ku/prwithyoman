'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  category : {type : String, default : 'BUZZ'},
  something : String

});

module.exports = mongoose.model('Post', PostSchema);
