// Exchange rates against given currency ---------------------------------------

$("#convertButton").click(function(){
  console.log("Click registered");

  // Get chosen currencies from dropdown
  var ccOne = document.getElementById("currencyOne");
  var chosenCurrencyOne = ccOne.options[ccOne.selectedIndex].value;

  console.log(chosenCurrencyOne);

  var ccTwo = document.getElementById("currencyTwo");
  var chosenCurrencyTwo = ccTwo.options[ccTwo.selectedIndex].value;

  // URL---------------------------------------

  var url = "https://api.exchangeratesapi.io/latest";//?symbols=EUR,GBP" ;//+ chosenCurrencyOne + "," + chosenCurrencyTwo;

  // var url = "https://api.exchangeratesapi.io/2010-01-12";

  $.getJSON( url , function(data) {

    var euro = 0;
    console.log("Currency Data");
    console.log(data.rates.GBP);

    euro = 1 / (data.rates.GBP);

    console.log("Euro rate: " + euro);

    console.log(data);
  });
});
