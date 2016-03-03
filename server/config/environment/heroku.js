'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOURL || 'mongodb://localhost/prwithyoman-dev'
  },

  seedDB: false
};
