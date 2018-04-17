# tiny-esc-pos

A Node.js helper package for using ESC/POS printer.  

## Usage

Using npm

```bash
# Install tiny-esc-pos
npm i tiny-esc-pos --save
```

Then you can import

```js
import TinyPOS from 'tiny-esc-pos';
```

### Example

```js
// This package was mainly created for bluetooth ESC/POS printers
import BluetoothSerial from 'react-native-bluetooth-serial';
import TinyPOS from 'tiny-esc-pos';

// Make sure you are already connected to the printer
const writePromises = [];

// Reset printer format
writePromises.push(BluetoothSerial.write(TinyPOS.init()));

// Write 'Hello World' with new line
writePromises.push(BluetoothSerial.write(
    TinyPOS.bufferedText('Hello World', {
        size: 'doubleheight',
        align: 'center',
        weight: 'bold'
    }, true) // new line
));

// Previously passed config will also take effectt
writePromises.push(BluetoothSerial.write(
    TinyPOS.bufferedText('Simple Receipt Test', {
        size: 'normal',
    })
));

// Add 3 new lines
writePromises.push(BluetoothSerial.write(
    TinyPOS.bufferedLine(3)
));

writePromises.push(BluetoothSerial.write(
    TinyPOS.bufferedText('Sample Receipt')
))

// Offset printing (our test printer won't feed until the end of the printing)
writePromises.push(BluetoothSerial.write(
    TinyPOS.print(2)
));

Promise.all(writePromises)
.then(res => console.log(res))
.catch(err => console.log(err.message));