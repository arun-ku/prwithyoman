'use strict';

var _ = require('lodash');
var Complains = require('./complains.model');
var ComplainTimeline = require('./complainTimeline.model');

// Get list of complainss
exports.index = function(req, res) {
  Complains.findById(req.params.id,function (err, complainss) {
    if(err) { return handleError(res, err); }
    ComplainTimeline.find({'complain.complainId' : req.params.id},function(err, timeline){
      return res.status(200).json({complain : complainss, timeline : timeline});
    })

  });
};

// Get a single complains
exports.show = function(req, res) {
  Complains.find({'user.userId' : req.params.id}, function (err, complains) {
    if(err) { return handleError(res, err); }
    if(!complains) { return res.status(404).send('Not Found'); }
    var countOfComplains;
    Complains.count({'user.userId' : req.params.id},function(err, count){
      countOfComplains = count;
      return res.json({data : complains, count : countOfComplains});
    });
  }).sort({'status.code':1, fireDate : -1}).limit(req.params.limit).skip(req.params.skip);
};

// Get All Complains
exports.getAllComplains = function(req, res) {
  Complains.find({},function (err, complains) {
    if(err) { return handleError(res, err); }
    if(!complains) { return res.status(404).send('Not Found'); }
    var countOfComplains;
    Complains.count({},function(err, count){
      countOfComplains = count;
      return res.json({data : complains, count : countOfComplains});
    });
  }).sort({'status.code':1, fireDate : -1 }).limit(req.params.limit).skip(req.params.skip);
};

exports.countUserComplains = function(req, res) {
  Complains.findById( req.params.id, function (err, complains) {
    if(err) { return handleError(res, err); }
    if(!complains) { return res.status(404).send('Not Found'); }
    ComplainTimeline.find({'complain.complainId' : req.params.id},function(err, timeline){
      return res.status(200).json({complain : complains, timeline : timeline});
    })
  });
};


// Creates a new complains in the DB.
exports.create = function(req, res) {
  Complains.create(req.body, function(err, complains) {
    if(err) { return handleError(res, err); }
    var timelineObj = {
      logMessage : req.user.name + ' lodged a new complain',
      logDate : Date.now(),
      complain : {
        complainId : complains._id,
        category : complains.category
      },
      user : req.body.user
    };
    ComplainTimeline.create(timelineObj, function(err, obj){
      if(err) { return handleError(res, err); }
    });
    return res.status(201).json(complains);
  });
};

// Updates an existing complains in the DB.
exports.update = function(req, res) {
  var user =  {
    userId : req.user._id,
    name : req.user.name,
    imageUrl : req.user.google.image.url
    },
    newUser =  {
      userId : req.user._id,
      name : req.user.name,
      imageUrl : req.user.google.image.url
    },
    status = {
    code : req.params.code,
    description : req.params.description
    },
    timelineObj = {
      logMessage : req.params.message,
      logDate : Date.now(),
      complain :{
        complainId : req.params.id
      },
      user : newUser
    }
  if(req.params.code == '3'){
    user = {
      userId : 'none',
      name : 'none',
      imageUrl : 'none'
    };
  }
  console.log(timelineObj);
  Complains.update({_id: req.params.id}, {$set : {status : status, assignee : user}}, function(err, count) {
    ComplainTimeline.create(timelineObj, function(err, obj){
      if(err) { return handleError(res, err); }
    });
  });
  res.json({status : status, assignee : user});
};

// Deletes a complains from the DB.
exports.destroy = function(req, res) {
  Complains.findById(req.params.id, function (err, complains) {
    if(err) { return handleError(res, err); }
    if(!complains) { return res.status(404).send('Not Found'); }
    complains.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
