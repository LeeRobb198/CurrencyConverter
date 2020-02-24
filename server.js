const express = require('express')
const app = express()
var https = require('https');
// var bodyParser = require('body-parser');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = require('jquery')(window);

app.use(express.static(__dirname)); // Get the html, js, css and image files
app.use(express.json());

// Send the index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

// app.use(bodyParser.json());

// Allowing CORS
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, PATCH, OPTIONS");
//   next();
// });

// Post Method -----------------------------------------------------------------

app.post('/historyAPI', function(request, response)  {
  console.log("Post request received by client");
  console.log(request.body);

  console.log("Check 1");

  // Search criteria
  var chosenCurrency = request.body.chosenCurrency;
  var startDate = request.body.startDate;
  var endDate = request.body.endDate;

  console.log(chosenCurrency);
  console.log(startDate);
  console.log(endDate);

  console.log("Check 2");

  var url = "https://api.exchangeratesapi.io/history?start_at=" + startDate+ "&end_at=" + endDate + "&base=" + chosenCurrency;

  https.get(url, function(res){
      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var apiResponse = JSON.parse(body);
          console.log("Got a response: ", apiResponse);
          response.status(200).json({
            message: "Response received",
            body: apiResponse
          });
      });
  }).on('error', function(e){
        console.log("Got an error: ", e);
  });

});


// Listen to the server on port 80 ---------------------------------------------

app.listen(80, function () {
  console.log('Example app listening on port 80! Go to https://localhost:80/')
})
