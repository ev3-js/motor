'use strict';

var _componentInherit = require('component-inherit');

var _componentInherit2 = _interopRequireDefault(_componentInherit);

var _ev3JsDevices = require('ev3-js-devices');

var _ev3JsDevices2 = _interopRequireDefault(_ev3JsDevices);

var _ev3JsDevice = require('ev3-js-device');

var _ev3JsDevice2 = _interopRequireDefault(_ev3JsDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * motor defaults
 */

var defaults = {
  speed: 300,
  braking: 'brake',
  wait: true
};

/**
 * Expose Motor
 */

/**
 * Imports
 */

module.exports = Motor;

/**
 * Motor device
 * @param {String} port port
 */
function Motor(port) {
  var path = (0, _ev3JsDevices2.default)(port);
  _ev3JsDevice2.default.call(this, path);
  this.write('speed_regulation', 'on');
}

(0, _componentInherit2.default)(Motor, _ev3JsDevice2.default);

Motor.prototype.is = function (flag) {
  return this.read('state').indexOf(flag) >= 0;
};

/**
 * Run motor forever
 * @param {Number} speed speed of motor
 * @api public
 */
Motor.prototype.runForever = function (speed, opts) {
  var _merge = merge(defaults, opts);

  var braking = _merge.braking;

  this.write('duty_cycle_sp', speed.toString());
  this.write('stop_commands', braking);
  this.write('command', 'run-forever');
};

/**
 * run forward for a number of degrees from the current position
 * @param  {Number} speed speed of motor
 * @param  {Number} degreees degrees to move
 * @api public
 */
Motor.prototype.runToRelPos = function (degrees, opts) {
  var _merge2 = merge(defaults, opts);

  var speed = _merge2.speed;
  var braking = _merge2.braking;
  var wait = _merge2.wait;

  this.write('position_sp', degrees.toString());
  this.write('speed_sp', speed.toString());
  this.write('stop_commands', braking);
  this.write('command', 'run-to-rel-pos');
  if (wait) {
    while (this.is('running')) {}
  }
  return;
};

/**
 * run until the motor position is at the value
 * @param  {Number} speed speed of motor
 * @param  {Number} position position to finish at
 * @api public
 */
Motor.prototype.runToAbsPos = function (position, opts) {
  var _merge3 = merge(defaults, opts);

  var speed = _merge3.speed;
  var braking = _merge3.braking;
  var wait = _merge3.wait;

  this.write('speed_sp', speed.toString());
  this.write('position_sp', position.toString());
  this.write('stop_commands', braking);
  this.write('command', 'run-to-abs-pos');
  if (wait) {
    while (this.is('running')) {}
  }
  return;
};

/**
 * reset the position of the motor
 * @api public
 */
Motor.prototype.reset = function () {
  this.write('command', 'reset');
};

/**
 * stop the motor
 */
Motor.prototype.stop = function () {
  this.write('command', 'stop');
};

/**
 * merge objects
 * @param  {Object} base   defaults
 * @param  {Object} source override params
 * @return {Object}        merged object
 */
function merge(base, source) {
  if (!source || base === source) {
    return base;
  }
  var newObj = base;
  for (var key in source) {
    newObj[key] = source[key];
  }
  return newObj;
}
