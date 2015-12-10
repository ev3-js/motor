/**
 * Imports
 */

import inherit from 'component-inherit'
import devices from 'ev3-js-devices'
import Device from 'ev3-js-device'

/**
 * motor defaults
 */

var defaults = {
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
  const {braking} = merge(defaults, opts)
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
Motor.prototype.runToRelPos = function (degrees, opts) {
  const {speed, braking, wait} = merge(defaults, opts)
  this.write('position_sp', degrees.toString())
  this.write('speed_sp', speed.toString())
  this.write('stop_command', braking)
  this.write('command', 'run-to-rel-pos')
  if (wait) { while (this.is('running')) {} }
  return
}

/**
 * run until the motor position is at the value
 * @param  {Number} speed speed of motor
 * @param  {Number} position position to finish at
 * @api public
 */
Motor.prototype.runToAbsPos = function (position, opts) {
  const {speed, braking, wait} = merge(defaults, opts)
  this.write('speed_sp', speed.toString())
  this.write('position_sp', position.toString())
  this.write('stop_command', braking)
  this.write('command', 'run-to-abs-pos')
  if (wait) { while (this.is('running')) {} }
  return
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

/**
 * merge objects
 * @param  {Object} base   defaults
 * @param  {Object} source override params
 * @return {Object}        merged object
 */
function merge (base, source) {
  if (!source || base === source) {
    return base
  }
  var newObj = base
  for (var key in source) {
    newObj[key] = source[key]
  }
  return newObj
}
