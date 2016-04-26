var docopt = require('docopt-js');
var bots = require('bots');


function docParser (f) {
  return f.toString().
    replace(/^[^\/]+\/\*!?/, '').
    replace(/\*\/[^\/]+$/, '');
}

var doc = docParser(function() {/*!
Usage:
  collective order <pizza_term>
  collective show <pizza_concept>
  collective add <pizza_schema_url>
  collective generate <pizza_schema>
  collective -h | --help | --version
*/});

function boot (config) {
  var defaultOpts = {
    'order'       : false,
    '<pizza_term>'       : null,
    'show'         : false,
    '<pizza_concept>'    : null,
    'add'          : false,
    '<pizza_schema_url>' : null,
    'generate'     : false,
    '<pizza_schema>'     : null,
    '-h'           : false,
    '--help'       : false,
    '--version'    : false
  };
  var opts = config || defaultOpts;
  console.dir(opts);

}

function init () {
  var initConfig = docopt.docopt(doc, { version: '0.0.1' });
  boot(initConfig);
}

init();
