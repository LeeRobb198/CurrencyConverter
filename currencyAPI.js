// Exchange rates against given currency ---------------------------------------

$("#convertButton").click(function(){
  console.log("Click registered");

  // Clears text area
  $("#currencyResultsTextArea").val("");

  // Get chosen currencies from dropdown
  var ccOne = document.getElementById("currencyOne");
  var chosenCurrencyOne = ccOne.options[ccOne.selectedIndex].value;

  console.log(chosenCurrencyOne);

  var ccTwo = document.getElementById("currencyTwo");
  var chosenCurrencyTwo = ccTwo.options[ccTwo.selectedIndex].value;

  // URL---------------------------------------

  var url = "https://api.exchangeratesapi.io/latest?base="+ chosenCurrencyOne; //+ "," + chosenCurrencyTwo;

  // var url = "https://api.exchangeratesapi.io/history?start_at=2015-01-01&end_at=2015-02-01"

  $.getJSON( url , function(data) {

    // var euro = 0;
    // console.log("Currency Data");
    // console.log(data.rates.GBP);
    //
    // euro = 1 / (data.rates.GBP);

    // console.log("Euro rate: " + euro);

    console.log(data);

    console.log(data.rates);

    ratesArray = data.rates;

    console.log(ratesArray);

    currencyArray = ["GBP", "EUR", "USD", "CAD", "HKD", "ISK", "PHP", "DKK"
                    , "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL"
                    , "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN"
                    , "TRY", "CNY", "NOK", "ZAR", "MXN", "ILS", "KRW", "MYR"]

    // Initial conversion message on text area
    document.getElementById("currencyResultsTextArea").value += ("1 GBP converts to: \n");

    for (var i = 0; i < currencyArray.length; i++) {
      if (currencyArray[i] !== chosenCurrencyOne) {
        var fullRate = ratesArray[currencyArray[i]];

        rounded2DecRate = Math.round(fullRate * 100) / 100;

        document.getElementById("currencyResultsTextArea").value += (rounded2DecRate + " " + currencyArray[i] + "\n");
      }
    }
    // document.getElementById("currencyResultsTextArea").value += (data.rates.GBP + " Pound Sterling = ");

  });
});
