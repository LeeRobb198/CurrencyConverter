// -----------------------------------------------------------------------------
// CurrencyAPI POST Method -----------------------------------------------------
// -----------------------------------------------------------------------------

var https = require('https');

module.exports = function(app){

  app.post('/currencyAPI', function(request, response)  {
    console.log("\n-------------------------------------------");
    console.log("CurrencyAPI post request received by client");
    console.log("-------------------------------------------");

    // Test - Returns the array from client
    console.log("\nRequest body from client: ");
    console.log(request.body);

    // Search criteria for API sent by client
    var chosenCurrency = request.body.chosenCurrency;

    // Testing
    console.log("\nParameters: ");
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
        console.log("\nCurrencyAPI got a response: \n", apiResponse);

        responseCurrencyData = {apiResponse};

        response.status(200).json({
          message: "Response received",
          body: responseCurrencyData
        });
      });

    }).on('error', function(e){
          console.log("\nCurrencyAPI got an error: ", e);
    });
  }); // End CurrencyAPI POST method
}
