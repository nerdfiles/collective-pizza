/**(
 * @fileOverview ./index.js
 * @description
 * Collective Pizza Button Bot.
 * )
 */
var five = require("johnny-five");
var request = require("request");

var interactionModel = function () {
  var modelInterface = {};
  modelInterface.loaded = ["down"];

  return function () {
    return modelInterface;
  };
}

new five.Board().on("ready", function() {
  var button = new five.Button("O5");

  interactionModel()().loaded.forEach(function(type) {
    button.on(type, function() {
      var purchase = request.post('/api/v1/purchase');
      purchase.then(function (validatedPurchaseRequest) {
        console.log(validatedPurchaseRequest);
      });
    });
  });
});
