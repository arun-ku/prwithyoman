'use strict';

var _ = require('lodash');
var Post = require('./post.model');

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  }).sort({buzzDate : -1}).limit(10).skip(req.param.offset);
};

// Get a single post
exports.show = function(req, res) {
  Post.find(function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  }).sort({buzzDate : -1}).limit(10).skip(req.params.id);
};

// Get posts with catagory
exports.showWithCategory = function(req, res) {
  Post.find({category : req.params.category},function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  }).sort({buzzDate : -1}).limit(10).skip(req.params.id);
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(req.body);
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
