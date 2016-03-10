/**
 * Created by arun on 10/3/16.
 */
'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ComplainsTimelineSchema = new Schema({
  logMessage : String,
  logDate : String,
  complain : {
    complainId : String,
    category : String
  },
  user : {
    userId : String,
    name : String,
    imageUrl : String
  }
});

module.exports = mongoose.model('ComplainsTimeline', ComplainsTimelineSchema);
