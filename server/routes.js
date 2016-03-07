/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var multer = require('multer');
var up = multer({storage: multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'upload'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "" + Math.ceil(Math.random()*9999) + file.originalname);
  }
})});

module.exports = function(app) {

  // Insert routes below
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/complainss', require('./api/complains'));
  app.use('/api/posts' ,up.single("file"), require('./api/post'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
