'use strict';

var configs = require('./config.json');


module.exports.getconfig = function() {
  configs.storage = configs.storage;
  return configs;
};