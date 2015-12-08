var inherit = require('component-inherit')
var Device = require('ev3-js-device')

function Motor (path) {
  Device.call(this, path)
}

inherit(Motor, Device)

Motor.prototype.runForever = function (s) {
  this.write('duty_cycle_sp', s)
  this.write('command', 'run-forever')
}

var motor = new Motor('/sys/class/tacho-motor/motor0')
motor.runForever()
