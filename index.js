var inherit = require('component-inherit')
var Device = require('ev3-js-device')

function Motor (path) {
  Device.call(this, path)
}

inherit(Motor, Device)

Motor.prototype.runForever = function (s) {
  this.write('duty_cycle_sp', s.toString())
  this.write('command', 'run-forever')
}

Motor.prototype.stop = function () {
  this.write('command', 'stop')
}

module.exports = Motor
