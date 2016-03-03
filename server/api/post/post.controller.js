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
    return res.status(201).json(req.body);
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
      var updateObj = {};
      var user = req.user;
      var pushObj ={
        userId : user._id,
        name : user.name,
        imageUrl : user.google.image.url,
        category : req.params.opinion
      };
      updateObj['count.'+req.params.opinion+'s'] = 1;
      console.log(updateObj, JSON.stringify(updateObj, null, 3));
      Post.update({_id: req.params.postId}, {$push : {opinion : pushObj}, $set: updateObj}, function(err, count) {
        console.log(err, count);
      });
      return res.send({ob1 :pushObj,ob2 : updateObj});
    }
    if(req.params.opinion == post.opinion[0].category){
      return res.send({message : "everything looks good major. no need to update"});
    }
    var _obj = {};
    switch (req.params.opinion) {
      case 'like' :
        console.log(post.opinion[0].category);
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
        console.log(post.opinion[0].category);
        _obj["count.dislikes"] = post.count.dislikes + 1;
        if (post.opinion[0].category == 'like') {
          _obj["count.likes"] = post.count.likes - 1;
        } else {;
          _obj["count.neutrals"] = post.count.neutrals - 1;
        }
        _obj["opinion.$.category"] = req.params.opinion;
        break;

      case 'neutral' :
        console.log(post.opinion[0].category);
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
    res.send('hola');
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
