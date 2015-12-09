var inherit = require('component-inherit')
var Device = require('ev3-js-device')

/*
 * Motor constructor
 */
function Motor (path) {
  Device.call(this, path)
  this.write('speed_regulation', 'on')
}

inherit(Motor, Device)

/**
 * run motor forever
 * @param  {String} s speed to run the motor
 */
Motor.prototype.runForever = function (s) {
  this.write('speed_sp', s.toString())
  this.write('command', 'run-forever')
}

/**
 * run forward for a number of degrees from the current position
 * @param  {String} s speed
 * @param  {String} d degrees to move
 */
Motor.prototype.runToRelPos = function (s, d) {
  this.write('speed_sp', s.toString())
  this.write('position_sp', d.toString())
  this.write('command', 'run-to-rel-pos')
}

/**
 * run until the motor position is p
 * @param  {String} s speed
 * @param  {String} p position to finish at
 */
Motor.prototype.runToAbsPos = function (s, p) {
  this.write('speed_sp', s.toString())
  this.write('position_sp', p.toString())
  this.write('command', 'run-to-abs-pos')
}

/**
 * reset the position of the motor
 */
Motor.prototype.reset = function () {
  this.write('command', 'reset')
}

/*
 * stops the motor
 * @param {Boolean} coast whether to coast or actively brake
 */
Motor.prototype.stop = function (coast) {
  var command = coast ? 'coast' : 'brake'
  this.write('command', command)
}

module.exports = Motor
