'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/:category', controller.showWithCategory);
//router.post('/', controller.create);
 router.post('/', auth.isAuthenticated(),function(req,res,next){
   if(!req.file){
     next();
   }
   else if(req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/jpg' ||req.file.mimetype == 'image/png'){
     next();
   }else{
     res.send({ result: 0, err : 'file type wrong'});
   }
 }, function(req, res, next){
   var postUserModel = {
     id : req.user._id,
     name : req.user.name,
     imageUrl : req.user.google.image.url
   }
   req.body.user = postUserModel;
   if(req.file)
    req.body.imageUrl = '/static-image/'+req.file.filename;
   next();
 }, controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
