# motor

[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Motor device for ev3.

## Installation

    $ npm install ev3-js-motor

## Usage

```js
var Motor = require('ev3-js-motor')
var motor = new Motor('/sys/class/tacho-motor')
motor.runForever()

setTimeout(function () {
  motor.stop()
}, 10000)
```

## API

### Motor(path)

  - `path` - file path to motor

**Returns:** a motor device instance

### .runForever(speed)
Run motor until stopped.

  - `speed` - speed at which to run motor

### .runDegrees(degrees, opts)
Run motor for a number of degrees.

  - `speed` - speed at which to run motor
  - `degrees` - number of degrees to turn the motor

### .runToAbsPos(position, opts)
Run motor until a specified motor position.

  - `speed` - speed at which to run motor
  - `position` - desired motor position

### .stop()
Stop motor.

### .reset()
Reset the position of the motor.

## License

MIT

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/ev3-js-motor.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ev3-js-motor
