const assert = require('chai').assert;
const MutableBuffer = require('mutable-buffer');
const pos = require('../index');

describe('Tiny ESC/POS Test', function() {

    const buffer = new MutableBuffer();
    
    it('pos#init', function() {
        buffer.write([0x1b, 0x40]);
        assert.deepEqual(pos.init(), buffer.flush());
    });
    it('pos#print', function() {
        buffer.write([0x0a]);
        assert.deepEqual(pos.print(), buffer.flush());
    });
    it('pos#bufferedText', function() {
        buffer.write('hello');
        assert.deepEqual(pos.bufferedText('hello'), buffer.flush());
    });
    it('pos#bufferedLine', function() {
        buffer.write([0x1b, 0x64, 0x03]);
        assert.deepEqual(pos.bufferedLine(3), buffer.flush());
    });
    it('pos#bufferedText[style=size#doubleheight]', function() {
        buffer.write([0x1b, 0x21, 0x10]);
        buffer.write('hello');
        assert.deepEqual(pos.bufferedText('hello', { size: 'doubleheight' }), buffer.flush());
    });
    it('pos#bufferedText[style=align#center]', function() {
        buffer.write([0x1b, 0x61, 0x01]);
        buffer.write('hello');
        assert.deepEqual(pos.bufferedText('hello', { align: 'center' }), buffer.flush());
    });
    it('pos#bufferedText[style=weight#bold]', function() {
        buffer.write([0x1b, 0x45, 0x01]);
        buffer.write('hello');
        assert.deepEqual(pos.bufferedText('hello', { weight: 'bold' }), buffer.flush());
    });
    it('pos#bufferedText[style=underline#heavy]', function() {
        buffer.write([0x1b, 0x2d, 0x02]);
        buffer.write('hello');
        assert.deepEqual(pos.bufferedText('hello', { underline: 'heavy' }), buffer.flush());
    });
    
});