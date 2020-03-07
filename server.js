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

// -----------------------------------------------------------------------------
// CurrencyAPI POST Method -----------------------------------------------------
// -----------------------------------------------------------------------------

app.post('/currencyAPI', function(request, response)  {
  console.log("CurrencyAPI post request received by client");

  // Test - Returns the array from client
  console.log(request.body);

  // Search criteria for API sent by client
  var chosenCurrency = request.body.chosenCurrency;

  // Testing
  console.log(chosenCurrency);

  // URL
  var url = "https://api.exchangeratesapi.io/latest?base="+ chosenCurrency;

  // Response to server --------------------------------------------------------

  https.get(url, function(res){

    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
      var apiResponse = JSON.parse(body);
      console.log("CurrencyAPI got a response: \n", apiResponse);

      responseCurrencyData = {apiResponse};

      response.status(200).json({
        message: "Response received",
        body: responseCurrencyData
      });
    });

  }).on('error', function(e){
        console.log("CurrencyAPI got an error: ", e);
  });
}); // End CurrencyAPI POST method

// -----------------------------------------------------------------------------
// CurrencyGraph POST Method ---------------------------------------------------
// -----------------------------------------------------------------------------

app.post('/currencyGraph', function(request, response)  {
  console.log("CurrencyConversionAPI post request received by client");

  // Test - Returns the array from client
  console.log(request.body);

  // Search criteria for API sent by client
  var chosenCurrency = request.body.chosenCurrency;
  var minimumExchangeRateValue = request.body.minimumExchangeRateValue;
  var maximumExchangeRateValue = request.body.maximumExchangeRateValue;

  // Testing
  console.log(chosenCurrency);
  console.log(minimumExchangeRateValue);
  console.log(maximumExchangeRateValue);

  // URL
  var url = "https://api.exchangeratesapi.io/latest?base="+ chosenCurrency;

  // Response to server --------------------------------------------------------

  https.get(url, function(res){

    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
      var apiResponse = JSON.parse(body);
      console.log("CurrencyGraph got a response: \n", apiResponse);

      // Declaration of arrays to store currencies and their rates
      var selectedCurrencyArray = [];
      var exchangeRatesArray = [];

      ratesArray = apiResponse.rates;

      currencyArray = ["GBP", "EUR", "USD", "CAD", "HKD", "ISK", "PHP", "DKK"
                      , "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL"
                      , "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN"
                      , "TRY", "CNY", "NOK", "ZAR", "MXN", "ILS", "KRW", "MYR"]

      fullNameCurrency = {"GBP": "Pound Sterling - GBP", "EUR": "Euro - EUR"
                      , "USD": "United States Dollar - USD", "CAD": "Canadian Dollar - CAD"
                      , "HKD": "Hong Kong Dollar - HKD", "ISK": "Icelandic Krona - ISK"
                      , "PHP": "Philippine Peso - PHP", "DKK": "Danish Krone - DKK"
                      , "HUF": "Hungarian Forin - HUF", "CZK": "Czech Koruna - CZK"
                      , "AUD": "Australian Dollar - AUD", "RON": "Romanian Leu - RON"
                      , "SEK": "Swedish Krona - SEK", "IDR": "Indonesian Rupiah - IDR"
                      , "INR": "Indian Rupee - INR", "BRL": "Brazilian Real - BRL"
                      , "RUB": "Russian Ruble - RUB", "HRK": "Croatian Kuna - HRK"
                      , "JPY": "Japanese Yen - JPY", "THB": "Thai Baht - THB"
                      , "CHF": "Swiss Franc - CHF", "SGD": "Singapore Dollar - SGD"
                      , "PLN": "Poland Złoty - PLN", "BGN": "Bulgarian Lev - BGN"
                      , "TRY": "Turkish Lira - TRY", "CNY": "Chinese Yuan - CNY"
                      , "NOK": "Norwegian Krone - NOK", "ZAR": "New Zealand Dollar - ZAR"
                      , "MXN": "Mexican Peso - MXN", "ILS": "Israeli New Shekel - ILS"
                      , "KRW": "South Korean Won - KRW", "MYR": "Malaysian Ringgit - MYR"};

      // Adds each currency to the text area
      for (var i = 0; i < currencyArray.length; i++) {
        if ((ratesArray[currencyArray[i]] > minimumExchangeRateValue) && (ratesArray[currencyArray[i]] < maximumExchangeRateValue)) {
          if (currencyArray[i] !== chosenCurrency) {
            var fullRate = ratesArray[currencyArray[i]];

            rounded2DecRate = Math.round(fullRate * 100) / 100;

            // Adds to the arrays to be used to construct graph
            selectedCurrencyArray.push(fullNameCurrency[currencyArray[i]]);
            exchangeRatesArray.push(rounded2DecRate);
          }
        }
      }
      console.log(selectedCurrencyArray);
      console.log(exchangeRatesArray);

      responseCurrencyData = {selectedCurrencyArray, exchangeRatesArray};

      response.status(200).json({
        message: "Response received",
        body: responseCurrencyData
      });
    });

  }).on('error', function(e){
        console.log("CurrencyAPI got an error: ", e);
  });
}); // End CurrencyGraph POST method

// -----------------------------------------------------------------------------
// HistoricExchangeRateGraph POST Method ---------------------------------------
// -----------------------------------------------------------------------------

app.post('/historyAPI', function(request, response)  {
  console.log("HistoryAPI post request received by client");

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
          console.log("HistoryAPI got a response: \n", apiResponse);

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

          responseHistoryData = {formattedDateArray, selectedCurrencyHistoryArray};

          // Server response ---------------------------------------------------

          response.status(200).json({
            message: "Response received",
            body: responseHistoryData
          });
      });
  }).on('error', function(e){
        console.log("HistoryAPI got an error: ", e);
  });
}); // End HistoricExchangeRateGraph POST method

// -----------------------------------------------------------------------------
// Listen to the server on port 80 ---------------------------------------------
// -----------------------------------------------------------------------------

app.listen(80, function () {
  console.log('Example app listening on port 80! Go to http://localhost:80/')
})
