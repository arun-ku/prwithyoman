/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Complains = require('./complains.model');

exports.register = function(socket) {
  Complains.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Complains.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('complains:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('complains:remove', doc);
}