const express = require('express')
const app = express()
var https = require('https');
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
app.listen(80, function () {
  console.log('Example app listening on port 80! Go to http://localhost:80/')
})
