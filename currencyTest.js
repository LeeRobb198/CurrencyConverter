$("#compareButton").click(function(){

  console.log("Click registered");

  // Clears text area
  $("#currencyResultsTextArea").val("");

  // Get chosen currencies from dropdown
  var ccOne = document.getElementById("currencyCompareDropdown");
  var chosenCurrencyCompare = ccOne.options[ccOne.selectedIndex].value;

  console.log(chosenCurrencyCompare);

  var currencyData = {chosenCurrencyCompare};

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(currencyData)
  }

  fetch('/testAPI', options);

});
