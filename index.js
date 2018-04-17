'use strict';
var Buffer = require('mutable-buffer');

var _ = {
    INIT:   [0x1b, 0x40]
};

_.test = function() {
    console.log('test me');
};

module.exports = _;