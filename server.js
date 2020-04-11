// -----------------------------------------------------------------------------
// Server JS -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const express = require('express')
const app = express();
// var http = require('http');
const PORT = process.env.PORT || 8080;
// set the port based on environment (more on environments later)
var port    = PORT;
app.use(express.json());

 // Get the public folder
app.use(express.static(__dirname + '/public'));
// Get the html page
app.use(express.static(__dirname));

// Get the CSS, JS and images
app.use("/css", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use("/images", express.static("./public/images"));

// Send the index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

// Requires POST methods from the different POST files
require('./routes/currencyAPIPost')(app);
require('./routes/currencyGraphPost')(app);
require('./routes/historyExchangeRateGraphPost')(app);

// Listen for server on port 80
// app.listen(PORT, function () {
//   console.log('iCurrency application listening on port ' + ${ PORT } + '! Go to http://localhost:' + ${ PORT } + '/')
// })

app.listen(PORT);
console.log('Express Server running at http://127.0.0.1:'.PORT);
