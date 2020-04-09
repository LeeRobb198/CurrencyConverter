// -----------------------------------------------------------------------------
// Exchange rates against given currency JS ------------------------------------
// -----------------------------------------------------------------------------

$("#conversionButton").click(async function(){
  console.log("Click registered");

  // Clears text area
  $("#currencyResultsTextArea").val("");

  // Get chosen currency from dropdown
  var cc = document.getElementById("currencyConversionDropdown");
  var chosenCurrency = cc.options[cc.selectedIndex].value;

  // Get amount from text field
  var amount = document.getElementById("amount").value;

  // Testing
  // console.log(chosenCurrencyConversion);
  // console.log(amount);

  if (isNaN(amount)) {
    // -------------------------------------------------------------------------
    // WORK TO BE DONE ---------------------------------------------------------
    // -------------------------------------------------------------------------
    console.log("Your not a number");
  } else {

    // Array to be sent to server
    var currencyConversionData = {chosenCurrency};

    // Content to be sent to server
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currencyConversionData)
    }

    // Sends request to server
    var responseCurrencyConversion = await fetch('/currencyAPI', options);

    var data = await responseCurrencyConversion.json();

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
    document.getElementById("conversionTitle").innerHTML = ("Currency Conversion");
    document.getElementById("currencyComparisonMessage").innerHTML = (amount + " " + chosenCurrency + " converts to: \n");

    // Adds each currency to the text area
    for (var i = 0; i < currencyArray.length; i++) {
      if (currencyArray[i] !== chosenCurrency) {
        var fullRate = amount * (ratesArray[currencyArray[i]]);

        rounded2DecRate = Math.round(fullRate * 100) / 100;

        document.getElementById("currencyResultsTextArea").value += (rounded2DecRate + " " + fullNameCurrency[currencyArray[i]] + " ("+ currencyArray[i] + ")\n");
      }
    }
  }
}); // End of button
