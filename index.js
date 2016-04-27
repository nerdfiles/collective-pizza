var docopt = require('docopt-js');
var bots = require('bots');
var r = ramda = require('ramda');


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
  /// @name boot
  /// @description
  /// Boot loader for the Collective Pizza.
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
  var available = true;

  console.dir(opts);

  opts._order = function () {
    /// @description
    /// @usage
    //
    var def = q.defer();
    def.resolve(opts['<pizza_term>']);
    return def.promise;
  };

  if (opts.order === available) {

    /// @expects { 'toppings': ['tomato', 'mushroom', 'jalapeño']}
    /// @output '0tomatomushroomjalapeño'
    opts._order().then(function (toppingsConstruct) {
      var _toppingsConstruct = R.lensProp('toppings');
      var toppingsId = R.view(_toppingsConstruct, toppingsConstruct);
      var padder = (z, y) => [z + y, z + y];
      var _toppingsId = R.mapAccum(padder, 0, toppingsId);
      var postData = {
        query: toppingsConstruct;
      };

      request({
        url    : 'api/v1/order',
        method : 'POST',
        data   : postData
      }).then(function (data) {
        opts.orders = data;
      });
    });
  }

  r.map(opts.order);
  return opts;
}

function init () {
  var initConfig = docopt.docopt(doc, { version: '0.0.1' });
  var _opts = boot(initConfig);
  return _opts;
}

init();
