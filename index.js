/**
 * Imports
 */

var inherit = require('component-inherit')
var Device = require('ev3-js-device')

/**
 * Expose Motor
 */

module.exports = Motor

/**
 * Motor device
 * @param {String} path path to file descriptor
 */
function Motor (path) {
  Device.call(this, path)
}

inherit(Motor, Device)

/**
 * Run motor forever
 * @param  {Number} speed speed of motor
 * @api public
 */

Motor.prototype.runForever = function (speed) {
  this.write('duty_cycle_sp', speed.toString())
  this.write('command', 'run-forever')
}

/**
 * Stop motor
 * @api public
 */

Motor.prototype.stop = function () {
  this.write('command', 'stop')
}
