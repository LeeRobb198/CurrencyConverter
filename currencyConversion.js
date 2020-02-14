// Exchange rates against given currency ---------------------------------------

$("#conversionButton").click(function(){
  console.log("Click registered");

  // Clears text area
  $("#currencyResultsTextArea").val("");

  // Get chosen currencies from dropdown
  var ccOne = document.getElementById("currencyConversionDropdown");
  var chosenCurrencyConversion = ccOne.options[ccOne.selectedIndex].value;

  // Get amount from text field
  var amount = document.getElementById("amount").value;

  console.log(chosenCurrencyConversion);
  console.log(amount);

  // URL---------------------------------------

  var url = "https://api.exchangeratesapi.io/latest?base="+ chosenCurrencyConversion;

  $.getJSON( url , function(data) {

    ratesArray = data.rates;

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
    document.getElementById("currencyComparisonMessage").innerHTML = (amount + " " + chosenCurrencyConversion + " converts to: \n");

    for (var i = 0; i < currencyArray.length; i++) {
      if (currencyArray[i] !== chosenCurrencyConversion) {
        var fullRate = amount * (ratesArray[currencyArray[i]]);

        rounded2DecRate = Math.round(fullRate * 100) / 100;

        document.getElementById("currencyResultsTextArea").value += (rounded2DecRate + " " + fullNameCurrency[currencyArray[i]] + " ("+ currencyArray[i] + ")\n");
      }
    }

  });
});
