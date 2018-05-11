'use strict';
const Buffer = require('mutable-buffer');

const COMMAND_INIT    = [0x1b, 0x40];
const COMMAND_CUT     = [0x1d, 0x41, 0x03];
const COMMAND_LF      = [0x0a];
const COMMAND_HT      = [0x09];

const SIZE_NORMAL     = [0x1b, 0x21, 0x00];
const SIZE_2H         = [0x1b, 0x21, 0x10];
const SIZE_2W         = [0x1b, 0x21, 0x20];
const SIZE_2SQ        = [0x1b, 0x21, 0x30];

const ALIGN_LEFT      = [0x1b, 0x61, 0x00];
const ALIGN_CENTER    = [0x1b, 0x61, 0x01];
const ALIGN_RIGHT     = [0x1b, 0x61, 0x02];

const WEIGHT_BOLD     = [0x1b, 0x45, 0x01];
const WEIGHT_NORMAL   = [0x1b, 0x45, 0x00];

const UNDERLINE_NONE  = [0x1b, 0x2d, 0x00];
const UNDERLINE_LIGHT = [0x1b, 0x2d, 0x01];
const UNDERLINE_HEAVY = [0x1b, 0x2d, 0x02];

const ITALIC_ON       = [0x1b, 0x34];
const ITALIC_OFF      = [0x1b, 0x35];
 
const KICK_DRAWER_2   = [0x1b, 0x70, 0x00, 0x19, 0xFA];
const KICK_DRAWER_5   = [0x1b, 0x70, 0x01, 0x19, 0xFA];

const BLANK_LINE      = [0x1b, 0x64, 0x01];

const _ = {

    /**
     * Return printer default formatting.
     * 
     * @name init
     * @function
     * @return {MutableBuffer} MutableBuffer
     */
    init: function() {
        return new Buffer().write(COMMAND_INIT).join();
    },

    /**
     * Return a buffered text based on style.
     * 
     * @name bufferedText
     * @function
     * @return {MutableBuffer} MutableBuffer
     */
    bufferedText: function(text, style = { size: null, align: null, weight: null, underline: null, italicize: null }, newline = false) {
        
        const bufferedText = new Buffer();
        const { size, align, weight, underline, italicize } = style;
        
        if(size) {
            if(size == 'normal')              bufferedText.write(SIZE_NORMAL);
            else if(size == 'doubleheight')   bufferedText.write(SIZE_2H);        
            else if(size == 'doublewidth')    bufferedText.write(SIZE_2W);
            else if(size == 'doublesquare')   bufferedText.write(SIZE_2SQ);
        }

        if(align) {
            if(align == 'left')             bufferedText.write(ALIGN_LEFT);
            else if(align == 'center')      bufferedText.write(ALIGN_CENTER);
            else if(align == 'right')       bufferedText.write(ALIGN_RIGHT);
        }

        if(weight) {
            if(weight == 'normal')          bufferedText.write(WEIGHT_NORMAL);
            else if(weight == 'bold')       bufferedText.write(WEIGHT_BOLD);            
        }

        if(underline) {
            if(underline == 'none')         bufferedText.write(UNDERLINE_NONE);
            else if(underline == 'light')   bufferedText.write(UNDERLINE_LIGHT);
            else if(underline == 'heavy')   bufferedText.write(UNDERLINE_HEAVY);        
        }

        if(italicize)   bufferedText.write(ITALIC_ON);
        else            bufferedText.write(ITALIC_OFF); 

        bufferedText.write(text);

        if(newline) bufferedText.write(COMMAND_LF);

        return bufferedText.join();
    
    },

    /**
     * Return a print command.
     * 
     * @name print
     * @function
     * @return {MutableBuffer} MutableBuffer
     */
    print: function(line = 0) {
        const bufferedPrint = new Buffer();

        if(line > 0) bufferedPrint.write([0x1b, 0x64, line]);
        
        bufferedPrint.write(COMMAND_LF);

        return bufferedPrint.join();

    },

    /**
     * Return a blank line command
     * 
     * @name bufferedLine
     * @function
     * @return {MutableBuffer} MutableBuffer
     */
    bufferedLine: function(number) {
        return new Buffer().write([0x1b, 0x64, number]).join();
    },

    kickCashDrawer: function() {
        return new Buffer().write(KICK_DRAWER_2).join();
    },

    bufferedBarcode: function(data) {
        const barcode = new Buffer();

        barcode.write([0x1d, 0x6b, 0x04]);
        barcode.write(data);
        barcode.write([0x00]);
        
        return barcode.join();
    },

    bufferedHorizontalTab: function() {
        return new Buffer().write(COMMAND_HT).join();        
    }

};

module.exports = _;