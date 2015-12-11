/**
 * Imports
 */

var inherit = require('component-inherit')
var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var defaults = require('101/defaults')

/**
 * motor defaults
 */

var motorDefaults = {
  speed: 300,
  braking: 'brake',
  wait: true
}

/**
 * Expose Motor
 */

module.exports = Motor

/**
 * Motor device
 * @param {String} port port
 */
function Motor (port) {
  const path = devices(port)
  Device.call(this, path)
  this.write('speed_regulation', 'on')
}

inherit(Motor, Device)

Motor.prototype.is = function (flag) {
  return this.read('state').indexOf(flag) >= 0
}

/**
 * Run motor forever
 * @param {Number} speed speed of motor
 * @api public
 */
Motor.prototype.runForever = function (speed, opts) {
  opts = defaults(opts, motorDefaults)
  var braking = opts.braking
  this.write('duty_cycle_sp', speed.toString())
  this.write('stop_command', braking)
  this.write('command', 'run-forever')
}

/**
 * run forward for a number of degrees from the current position
 * @param  {Number} speed speed of motor
 * @param  {Number} degreees degrees to move
 * @api public
 */
Motor.prototype.runDegrees = function (degrees, opts) {
  opts = defaults(opts, motorDefaults)
  var speed = opts.speed
  var braking = opts.braking
  var wait = opts.wait

  this.write('position_sp', degrees.toString())
  this.write('speed_sp', speed.toString())
  this.write('stop_command', braking)
  this.write('command', 'run-to-rel-pos')
  if (wait) { while (this.is('running')) {} }
}

/**
 * run until the motor position is at the value
 * @param  {Number} speed speed of motor
 * @param  {Number} position position to finish at
 * @api public
 */
Motor.prototype.runToAbsPos = function (position, opts) {
  opts = defaults(opts, motorDefaults)
  var speed = opts.speed
  var braking = opts.braking
  var wait = opts.wait

  this.write('speed_sp', speed.toString())
  this.write('position_sp', position.toString())
  this.write('stop_command', braking)
  this.write('command', 'run-to-abs-pos')
  if (wait) { while (this.is('running')) {} }
}

/**
 * reset the position of the motor
 * @api public
 */
Motor.prototype.reset = function () {
  this.write('command', 'reset')
}

/**
 * stop the motor
 */
Motor.prototype.stop = function () {
  this.write('command', 'stop')
}
