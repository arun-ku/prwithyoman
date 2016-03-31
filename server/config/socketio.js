/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');
var Auth = require('../auth/auth.service');
var expressJwt = require('express-jwt');
var cookieParser = require('cookie-parser');
var validateJwt = expressJwt({ secret: config.secrets.session });
var users = [];
var sockets = {};

// When the user disconnects.. perform this
function onDisconnect(socket) {
}
/*

(function(Auth.isAuthenticated(),))();
*/

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/chat/chat.socket').register(socket);
  require('../api/comment/comment.socket').register(socket);
  require('../api/complains/complains.socket').register(socket);
  require('../api/post/post.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", socketio, "\n\n\n\n\n");
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;
console.log('socket========================',socket.id);
    console.log(socket.handshake.headers.cookie);

    //var cookieObj = cookieParser.JSONCookie(socket.handshake.headers.cookie);
    //console.log(cookieObj);
    var reqObj = {
      headers: socket.handshake.headers
    };


    cookieParser()(reqObj, {}, function (req, res, next) {
      console.log("++++++", reqObj);

      reqObj.headers.authorization = "Bearer " + JSON.parse(reqObj.cookies.token);
      Auth.isAuthenticated()(reqObj, {}, function() {
        console.log(reqObj.user);
        if(!sockets.hasOwnProperty(reqObj.user._id)){
          users.push(reqObj.user);
        }
        sockets[reqObj.user._id] = socket;

      });
    });


    socket.connectedAt = new Date();
    console.log('################################',socket.id);
    /*
    socket.join('chatroom');
*/
    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);

    socket.on('request-user',function(){
      socketio.emit('users',{users : users})
    })

    socket.on('send-message',function(data){

      sockets[data.toUser].emit('new-message',data);
    })
  });
};
