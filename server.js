const express = require('express')
const app = express()
var https = require('https');
app.use(express.json());

// Get the html, js, css and image files
app.use(express.static(__dirname));

 // Get the public folder
// app.use(express.static(__dirname + '/public'));
// Get the html page
// app.use(express.static(__dirname));

// Get the CSS, JS and images
// app.use("/css", express.static("./public/css"));
// app.use("/js", express.static("./public/js"));
// app.use("/images", express.static("./public/images"));

// Send the index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

// Post Method -----------------------------------------------------------------

app.post('/historyAPI', function(request, response)  {
  console.log("Post request received by client");

  // Test - Returns the array from client
  console.log(request.body);

  // Search criteria for API sent by client
  var chosenCurrency = request.body.chosenCurrency;
  var startDate = request.body.startDate;
  var endDate = request.body.endDate;

  // Testing
  console.log(chosenCurrency);
  console.log(startDate);
  console.log(endDate);

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
}); // End POST method


// Listen to the server on port 80 ---------------------------------------------

app.listen(80, function () {
  console.log('Example app listening on port 80! Go to https://localhost:80/')
})
