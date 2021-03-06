'use strict';

var express = require('express');
var controller = require('./complains.controller')
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:id', controller.index);
router.get('/getComplain/:id', controller.countUserComplains);
router.get('/getAllComplains/:limit/:skip', controller.getAllComplains);
router.get('/:limit/:skip/:id', controller.show);
router.post('/',auth.isAuthenticated(),function(req, res, next){
  req.body.user = {
    userId : req.user._id,
    name : req.user.name,
    imageUrl : req.user.google.image.url
  }
  next();
}, controller.create);
router.put('/getAllComplains/:id/:code/:description/:message', auth.isAuthenticated(), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
