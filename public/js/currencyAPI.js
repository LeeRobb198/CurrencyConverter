// -----------------------------------------------------------------------------
// Exchange rates against given currency JS ------------------------------------
// -----------------------------------------------------------------------------

$("#compareButton").click(async function(){
  console.log("Click registered");

  // Clears text area
  $("#currencyResultsTextArea").val("");

  // Get chosen currencies from dropdown
  var cc = document.getElementById("currencyCompareDropdown");
  var chosenCurrency = cc.options[cc.selectedIndex].value;

  // Testing
  // console.log(chosenCurrency);

  // Array to be sent to server
  var currencyData = {chosenCurrency};

  // Content to be sent to server
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(currencyData)
  }

  // Sends request to server
  var responseCurrency = await fetch('/currencyAPI', options);

  var data = await responseCurrency.json();

  // Post Server Request -------------------------------------------------------

  // Testing
  // console.log(data);
  // console.log(data.body.apiResponse.rates);

  ratesArray = data.body.apiResponse.rates;

  currencyArray = ["GBP", "EUR", "USD", "CAD", "HKD", "ISK", "PHP", "DKK"
                  , "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL"
                  , "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN"
                  , "TRY", "CNY", "NOK", "ZAR", "MXN", "ILS", "KRW", "MYR"]

  fullNameCurrency = {"GBP": "Pound Sterling", "EUR": "Euro"
                  , "USD": "United States Dollar", "CAD": "Canadian Dollar"
                  , "HKD": "Hong Kong Dollar", "ISK": "Icelandic Krona"
                  , "PHP": "Philippine Peso", "DKK": "Danish Krone"
                  , "HUF": "Hungarian Forin", "CZK": "Czech Koruna"
                  , "AUD": "Australian Dollar", "RON": "Romanian Leu"
                  , "SEK": "Swedish Krona", "IDR": "Indonesian Rupiah"
                  , "INR": "Indian Rupee", "BRL": "Brazilian Real"
                  , "RUB": "Russian Ruble", "HRK": "Croatian Kuna"
                  , "JPY": "Japanese Yen", "THB": "Thai Baht"
                  , "CHF": "Swiss Franc", "SGD": "Singapore Dollar"
                  , "PLN": "Poland Złoty", "BGN": "Bulgarian Lev"
                  , "TRY": "Turkish Lira", "CNY": "Chinese Yuan"
                  , "NOK": "Norwegian Krone", "ZAR": "New Zealand Dollar"
                  , "MXN": "Mexican Peso", "ILS": "Israeli New Shekel"
                  , "KRW": "South Korean Won", "MYR": "Malaysian Ringgit"};

  // Initial title and conversion message on text area
  document.getElementById("conversionTitle").innerHTML = ("Exchange Rate Comparison");
  document.getElementById("currencyComparisonMessage").innerHTML = ("1 " + chosenCurrency + " converts to: \n");

  // Adds each currency to the text area
  for (var i = 0; i < currencyArray.length; i++) {
    if (currencyArray[i] !== chosenCurrency) {
      var fullRate = ratesArray[currencyArray[i]];

      // Converts to 2 decimal places
      rounded2DecRate = Math.round(fullRate * 100) / 100;

      document.getElementById("currencyResultsTextArea").value += (rounded2DecRate + " " + fullNameCurrency[currencyArray[i]] + " ("+ currencyArray[i] + ")\n");
    }
  }
}); // End of button
