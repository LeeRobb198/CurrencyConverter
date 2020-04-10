// -----------------------------------------------------------------------------
// HistoricExchangeRateGraph POST Method ---------------------------------------
// -----------------------------------------------------------------------------

var https = require('https');

module.exports = function(app){

  app.post('/historyAPI', function(request, response)  {
    console.log("\n------------------------------------------");
    console.log("HistoryAPI post request received by client");
    console.log("------------------------------------------");

    // Test - Returns the array from client
    console.log("\nRequest body from client: ");
    console.log(request.body);

    // Search criteria for API sent by client
    var chosenCurrency = request.body.chosenCurrency;
    var chosenComparisonCurrency = request.body.chosenComparisonCurrency;
    var startDate = request.body.startDate;
    var endDate = request.body.endDate;

    // Testing
    console.log("\nParameters: ");
    console.log(chosenCurrency);
    console.log(chosenComparisonCurrency);
    console.log(startDate);
    console.log(endDate);

    var url = "https://api.exchangeratesapi.io/history?start_at=" + startDate+ "&end_at=" + endDate + "&base=" + chosenCurrency;

    // Response to server ------------------------------------------------------

    https.get(url, function(res){

        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            var apiResponse = JSON.parse(body);

            //Testing - Large response of dates
            // console.log("\nHistoryAPI got a response: \n", apiResponse);

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

            // Retrieves exchange rate of given date
            for (var i = 0; i < formattedDateArray.length; i++) {
              var currencyHistory = (apiResponse.rates[formattedDateArray[i]][chosenComparisonCurrency]);
              selectedCurrencyHistoryArray.push(currencyHistory);
            }

            // Testing - Arrays
            // console.log("Formatted date: " + formattedDateArray);
            // console.log("Currency Chosen: " + selectedCurrencyHistoryArray);

            responseHistoryData = {formattedDateArray, selectedCurrencyHistoryArray};

            // Server response -------------------------------------------------

            response.status(200).json({
              message: "Response received",
              body: responseHistoryData
            });
        });
    }).on('error', function(e){
          console.log("\nHistoryAPI got an error: ", e);
    });
  }); // End HistoricExchangeRateGraph POST method
}
