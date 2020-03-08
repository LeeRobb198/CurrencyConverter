// -----------------------------------------------------------------------------
// CurrencyGraph POST Method ---------------------------------------------------
// -----------------------------------------------------------------------------

var https = require('https');

module.exports = function(app){

  app.post('/currencyGraph', function(request, response)  {
    console.log("\n-----------------------------------------------------");
    console.log("CurrencyConversionAPI post request received by client");
    console.log("-----------------------------------------------------");

    // Test - Returns the array from client
    console.log("\nRequest body from client: ");
    console.log(request.body);

    // Search criteria for API sent by client
    var chosenCurrency = request.body.chosenCurrency;
    var minimumExchangeRateValue = request.body.minimumExchangeRateValue;
    var maximumExchangeRateValue = request.body.maximumExchangeRateValue;

    // Testing
    console.log("\nParameters: ");
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
        console.log("\nCurrencyGraph got a response: \n", apiResponse);

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

        // Testing - Arrays
        // console.log(selectedCurrencyArray);
        // console.log(exchangeRatesArray);

        responseCurrencyData = {selectedCurrencyArray, exchangeRatesArray};

        response.status(200).json({
          message: "Response received",
          body: responseCurrencyData
        });
      });

    }).on('error', function(e){
          console.log("\nCurrencyAPI got an error: ", e);
    });
  }); // End CurrencyGraph POST method
}
