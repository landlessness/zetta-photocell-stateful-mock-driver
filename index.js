var Device = require('zetta-device');
var util = require('util');

var TIMEOUT = 3000;
function degToRad(x) {
  return x * ( Math.PI / 180 );
}

var Photocell = module.exports = function(opts) {
  Device.call(this);
  this.opts = opts || {};
  this.intensity = 0;
  this._increment = this.opts['increment'] || 15;
  this._timeOut = null;
  this._counter = 0;
};
util.inherits(Photocell, Device);

Photocell.prototype.init = function(config) {
  var name = this.opts.name || 'Photocell';

  config
    .name(name)
    .type('photocell')
    .state('ready')
    .when('ready', {allow: ['make-not-ready']})
    .when('not-ready', {allow: ['make-ready']})
    .map('make-not-ready', this.makeNotReady)
    .map('make-ready', this.makeReady)
    .monitor('intensity');

  this._startMockData();
};

Photocell.prototype.makeReady = function(cb) {
  this.state = 'ready';
  this._startMockData();
  cb();
}

Photocell.prototype.makeNotReady = function(cb) {
  this.state = 'not-ready'
  this._stopMockData();
  cb();
}

Photocell.prototype._startMockData = function(cb) {
  var self = this;
  this._timeOut = setInterval(function() {
    self.intensity = Math.sin(degToRad(self._counter)) + 1.0;
    self._counter += self._increment;
  }, 100);
}

Photocell.prototype._stopMockData = function(cb) {
  clearTimeout(this._timeOut);
}

