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

  var url = "https://api.exchangeratesapi.io/latest?symbols=" + chosenCurrencyOne + "," + chosenCurrencyTwo;

  $.getJSON( url , function(data) {
    console.log("Currency Data");
    console.log(data);
  });
});
