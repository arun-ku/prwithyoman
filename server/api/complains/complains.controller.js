'use strict';

var _ = require('lodash');
var Complains = require('./complains.model');

// Get list of complainss
exports.index = function(req, res) {
  Complains.find(function (err, complainss) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(complainss);
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
  }).sort({fireDate : -1}).limit(5).skip(req.params.skip);
};

exports.countUserComplains = function(req, res) {
  Complains.find({'user.userId' : req.params.id}, function (err, complains) {
    if(err) { return handleError(res, err); }
    if(!complains) { return res.status(404).send('Not Found'); }
    console.log(complains.length);
    return res.json({count : complains.length});
  });
};


// Creates a new complains in the DB.
exports.create = function(req, res) {
  Complains.create(req.body, function(err, complains) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(complains);
  });
};

// Updates an existing complains in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Complains.findById(req.params.id, function (err, complains) {
    if (err) { return handleError(res, err); }
    if(!complains) { return res.status(404).send('Not Found'); }
    var updated = _.merge(complains, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(complains);
    });
  });
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
