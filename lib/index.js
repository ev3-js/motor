/**
 * Imports
 */

var inherit = require('component-inherit')
var devices = require('ev3-js-devices')
var Device = require('ev3-js-device')
var defaults = require('101/defaults')

var cache = {}

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
  if (!(this instanceof Motor)) {
    return new Motor(port)
  }
  try {
    Device.call(this, devices(port))
  } catch (e) {
    throw new Error('Cannot find motor')
  }
  this.write('speed_regulation', 'on')
  this.run = writeAndCache.bind(this)
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
Motor.prototype.forever = function (speed, opts) {
  opts = defaults(opts, motorDefaults)
  var braking = opts.braking

  this.run('speed_sp', speed.toString())
  this.run('stop_command', braking)
  this.run('command', 'run-forever')
}

/**
 * run forward for a number of degrees from the current position
 * @param  {Number} speed speed of motor
 * @param  {Number} degreees degrees to move
 * @api public
 */
Motor.prototype.degrees = function (degrees, opts) {
  opts = defaults(opts, motorDefaults)
  var speed = opts.speed
  var braking = opts.braking
  var wait = opts.wait

  this.run('position_sp', degrees.toString())
  this.run('speed_sp', speed.toString())
  this.run('stop_command', braking)
  cache.command = 'run-to-rel-pos'
  this.write('command', 'run-to-rel-pos')
  if (wait) { while (this.is('running')) {} }
}

/**
 * run motor for time in milliseconds
 * @param  {Number} time time in milliseconds
 * @param  {Object} opts object of optional parameters
 */
Motor.prototype.timed = function (time, opts) {
  opts = defaults(opts, motorDefaults)
  var speed = opts.speed
  var braking = opts.braking
  var wait = opts.wait

  this.run('time_sp', time.toString())
  this.run('speed_sp', speed.toString())
  this.run('stop_command', braking)
  cache.command = 'run-timed'
  this.write('command', 'run-timed')
  if (wait) { while (this.is('running')) {} }
}

/**
 * run motor for number of rotations
 * @param  {Number} rotations the number of rotations to turn the motor
 * @param  {Object} opts      object of optional parameters
 */
Motor.prototype.rotations = function (rotations, opts) {
  opts = defaults(opts, motorDefaults)
  this.degrees(rotations * 360, opts)
}

/**
 * run until the motor position is at the value
 * @param  {Number} position position to finish at
 * @param  {Object} opts object of optional parameters
 * @api public
 */
Motor.prototype.runToAbsPos = function (position, opts) {
  opts = defaults(opts, motorDefaults)
  var speed = opts.speed
  var braking = opts.braking
  var wait = opts.wait

  this.run('speed_sp', speed.toString())
  this.run('position_sp', position.toString())
  this.run('stop_command', braking)
  cache.command = 'run-to-abs-pos'
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

function writeAndCache (command, value) {
  if (cache[command] === value) return
  cache[command] = value
  this.write(command, value)
}
