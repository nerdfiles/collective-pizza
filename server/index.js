/**(
 * @fileOverview ./server/index.js
 * @description
 * Collective Pizza Server.
 * )
 */
var
express = require('express'),
http = require('http'),
app = express(),
server = http.createServer(app);

/// Config
server.listen(3000);
app.set('views', path.join(__dirname, '../order'));
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(express.static(__dirname + '/order'));

/// Route Contracts
app.get('/', function(req,res) {
  res.render('index');
});

app.post('api/v1/order', function order (req, res, next) {
  res.send();
}