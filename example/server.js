var zetta = require('zetta');
var Photocell = require('../index');
var argv = require('minimist')(process.argv.slice(2));

var increment = argv['i'];

zetta()
  .use(Photocell, {increment: increment})
  .listen(1337);
