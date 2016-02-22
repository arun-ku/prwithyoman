'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');
var config = require('../../config/environment');

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/',
    hd : config.google.hd,
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false
  }))

  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
