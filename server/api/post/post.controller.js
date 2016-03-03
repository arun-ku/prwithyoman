'use strict';

var _ = require('lodash');
var Post = require('./post.model');

// Get list of posts
exports.index = function (req, res) {
  Post.find(function (err, posts) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(posts);
  }).sort({buzzDate: -1}).limit(10).skip(req.param.offset);
};

// Get a single post
exports.show = function (req, res) {
  Post.find(function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    return res.json(post);
  }).sort({buzzDate: -1}).limit(10).skip(req.params.id);
};

// Get posts with catagory
exports.showWithCategory = function (req, res) {
  Post.find({category: req.params.category}, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    return res.json(post);
  }).sort({buzzDate: -1}).limit(10).skip(req.params.id);
};

// Creates a new post in the DB.
exports.create = function (req, res) {
  Post.create(req.body, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(post);
  });
};

// Updates an existing post in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(post);
    });
  });
};

exports.updateOpinion = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Post.findOne({_id: req.params.postId, "opinion.userId": req.user._id}, {'opinion.$': 1, count:1}, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      console.log('nomatch');
      var updateObj = {};
      var user = req.user;
      var pushObj ={
        userId : user._id,
        name : user.name,
        imageUrl : user.google.image.url,
        category : req.params.opinion
      };
      updateObj['count.'+req.params.opinion+'s'] = 1;
      Post.update({_id: req.params.postId}, {$push : {opinion : pushObj}, $inc: updateObj}, function(err, count) {
        console.log( count);
      });
      return res.send(pushObj);
    }
    if(req.params.opinion == post.opinion[0].category){
      return res.send({resCode : 0, message : "everything looks good major. no need to update"});
    }
    var _obj = {};
    var previousType = '';
    switch (req.params.opinion) {
      case 'like' :
        previousType = post.opinion[0].category;
        _obj["count.likes"] = post.count.likes + 1;
        if (post.opinion[0].category == 'dislike') {
            _obj["count.dislikes"] = post.count.dislikes - 1;
          } else {
            console.log(typeof(post.count.likes));
            _obj["count.neutrals"] = post.count.neutrals - 1;
          }
        _obj["opinion.$.category"] = req.params.opinion;
        break;

      case 'dislike' :
        previousType = post.opinion[0].category;
        _obj["count.dislikes"] = post.count.dislikes + 1;
        if (post.opinion[0].category == 'like') {
          _obj["count.likes"] = post.count.likes - 1;
        } else {;
          _obj["count.neutrals"] = post.count.neutrals - 1;
        }
        _obj["opinion.$.category"] = req.params.opinion;
        break;

      case 'neutral' :
        previousType = post.opinion[0].category;
        _obj["count.neutrals"] = post.count.neutrals + 1;
        if (post.opinion[0].category == 'dislike') {
          _obj["count.dislikes"] = post.count.dislikes - 1;
        } else {
          _obj["count.likes"] = post.count.likes - 1;
        }
        _obj["opinion.$.category"] = req.params.opinion;
        break;
    }
    Post.update({_id: req.params.postId, "opinion.userId": req.user._id}, {
      $set: _obj
    },function(err){
      if(err){
        console.log(err);
      }
    });
    res.send({type : previousType});
  });
};

// Deletes a post from the DB.
exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    post.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
