'use strict';
var Buffer = require('mutable-buffer');

var COMMAND_INIT    = [0x1b, 0x40];
var COMMAND_CUT     = [0x1d, 0x41, 0x03];
var COMMAND_LF      = [0x0a];

var SIZE_NORMAL     = [0x1b, 0x21, 0x00];
var SIZE_2H         = [0x1b, 0x21, 0x10];
var SIZE_2W         = [0x1b, 0x21, 0x20];
var SIZE_2SQ        = [0x1b, 0x21, 0x30];

var ALIGN_LEFT      = [0x1b, 0x61, 0x00];
var ALIGN_CENTER    = [0x1b, 0x61, 0x01];
var ALIGN_RIGHT     = [0x1b, 0x61, 0x02];

var WEIGHT_BOLD     = [0x1b, 0x45, 0x01];
var WEIGHT_NORMAL   = [0x1b, 0x45, 0x00];

var UNDERLINE_NONE  = [0x1b, 0x2d, 0x00];
var UNDERLINE_LIGHT = [0x1b, 0x2d, 0x01];
var UNDERLINE_HEAVY = [0x1b, 0x2d, 0x02];

var ITALIC_ON       = [0x1b, 0x34];
var ITALIC_OFF      = [0x1b, 0x35];
 
var KICK_DRAWER_2   = [0x1b, 0x70, 0x00, 0x19, 0xFA];
var KICK_DRAWER_5   = [0x1b, 0x70, 0x01, 0x19, 0xFA];

var BLANK_LINE      = [0x1b, 0x64, 0x01];

var _ = {

    init: function() {
        return new Buffer().write(COMMAND_INIT).join();
    },

    bufferedText: function(text, style) {
        return new Buffer().write(text).join();
    },

    print: function() {
        return new Buffer().write(COMMAND_LF).join();
    },

    bufferedLine: function(number) {
        return new Buffer().write([0x1b, 0x64, number]).join();
    }

};

module.exports = _;