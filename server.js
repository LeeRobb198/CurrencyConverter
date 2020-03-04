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

// Post Method -----------------------------------------------------------------

app.post('/historyAPI', function(request, response)  {
  console.log("Post request received by client");

  // Test - Returns the array from client
  console.log(request.body);

  // Search criteria for API sent by client
  var chosenCurrency = request.body.chosenCurrency;
  var chosenComparisonCurrency = request.body.chosenComparisonCurrency;
  var startDate = request.body.startDate;
  var endDate = request.body.endDate;

  // Testing
  console.log(chosenCurrency);
  console.log(chosenComparisonCurrency);
  console.log(startDate);
  console.log(endDate);

  var url = "https://api.exchangeratesapi.io/history?start_at=" + startDate+ "&end_at=" + endDate + "&base=" + chosenCurrency;

  // Response to server --------------------------------------------------------

  https.get(url, function(res){

      var body = '';

      res.on('data', function(chunk){
          body += chunk;
      });

      res.on('end', function(){
          var apiResponse = JSON.parse(body);
          console.log("Got a response: \n", apiResponse);

          // console.log("Server res: " + Object.keys(apiResponse.rates));

          // Constructs arrays
          var selectedCurrencyHistoryArray = [];
          var datesArray = Object.keys(apiResponse.rates);
          var unixDateArray = [];
          var formattedDateArray = [];

          // For loop converting date into unix time
          for (var i = 0; i < datesArray.length; i++) {
            var unixDate = Date.parse(datesArray[i]);
            unixDateArray.push(unixDate)
          }

          // Sorting dates in order
          sortedDatesArray = unixDateArray.sort(function(x, y){
            return x - y;
          });

          // Convert back to date format
          for (var i = 0; i < sortedDatesArray.length; i++) {
            var specificDate = new Date(sortedDatesArray[i]);

            var dd = specificDate.getDate();
            var mm = specificDate.getMonth()+1;
            var yyyy = specificDate.getFullYear();

            if (dd < 10) {
              dd = "0" + dd;
            }

            if (mm < 10) {
              mm = "0" + mm;
            }

            // Formats date to yyyy-mm-dd
            var formattedDate = yyyy.toString()+'-'+mm+'-'+dd;

            // Adds formatted date to array to be used in graph
            formattedDateArray.push(formattedDate);
          }

          console.log("Formatted date: " + formattedDateArray);

          // Retrieves exchange rate of given date
          for (var i = 0; i < formattedDateArray.length; i++) {
            var currencyHistory = (apiResponse.rates[formattedDateArray[i]][chosenComparisonCurrency]);
            selectedCurrencyHistoryArray.push(currencyHistory);
          }

          console.log("Currency Chosen: " + selectedCurrencyHistoryArray);

          responseData = {formattedDateArray, selectedCurrencyHistoryArray};

          // Server response ---------------------------------------------------

          response.status(200).json({
            message: "Response received",
            body: responseData
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
