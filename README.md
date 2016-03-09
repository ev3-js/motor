# motor

[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Motor device for ev3.

## Installation

    $ npm install ev3-js-motor

## Usage

```js
var Motor = require('ev3-js-motor')
Motor('a').degrees(120, {
  speed: 300,
  braking: 'coast'
})
```

## API

### Motor(port)

  - `path` - port in which the motor is connected

**Returns:** a motor device instance

### .forever(speed)
Run motor until stopped.

  - `speed` - speed at which to run motor

### .degrees(degrees, opts)
Run motor for a number of degrees.

  - `degrees` - number of degrees to turn the motor
  - `opts` - object of optional parameters

### .rotations(rotations, opts)
Run motor for a number of rotations.

  - `rotations` - number of rotations to turn the motor
  - `opts` - object of optional parameters

### .timed(time, opts)
Run motor for a specified amount of time.

  - `time` - time in milliseconds
  - `opts` - object of optional parameters


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
