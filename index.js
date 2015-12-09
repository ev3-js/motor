/**
 * Imports
 */

var inherit = require('component-inherit')
var Device = require('ev3-js-device')
var sleep = require('sleep').usleep

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
  this.write('speed_regulation', 'on')
}

inherit(Motor, Device)

/**
 * Run motor forever
 * @param {Number} speed speed of motor
 * @api public
 */
Motor.prototype.runForever = function (speed) {
  this.write('duty_cycle_sp', speed.toString())
  this.write('command', 'run-forever')
}

/**
 * run forward for a number of degrees from the current position
 * @param  {Number} speed speed of motor
 * @param  {Number} degreees degrees to move
 * @api public
 */\
Motor.prototype.runToRelPos = function (speed, degrees) {
  this.write('speed_sp', speed.toString())
  this.write('position_sp', degrees.toString())
  this.write('command', 'run-to-rel-pos')
  return until.call(this)
}

/**
 * run until the motor position is at the value
 * @param  {Number} speed speed of motor
 * @param  {Number} position position to finish at
 * @api public
 */
Motor.prototype.runToAbsPos = function (speed, position) {
  this.write('speed_sp', speed.toString())
  this.write('position_sp', position.toString())
  this.write('command', 'run-to-abs-pos')
  return until.call(this)
}

/**
 * reset the position of the motor
 * @api public
 */
Motor.prototype.reset = function () {
  this.write('command', 'reset')
}

/*
 * stops the motor
 * @param {Boolean} coast whether to coast or actively brake
 * @api public
 */
Motor.prototype.stop = function () {
  this.write('command', 'stop')
}

/**
 * hold execution until move is finished
 */
function until () {
  var incomplete = true
  while (incomplete) {
    if (this.read('state').trim().length > 0) {
      incomplete = false
    }
    sleep(5000)
  }
}
