// -----------------------------------------------------------------------------
// Creates A Graph Of Exchange Rates Against A Given Currency JS ---------------
// -----------------------------------------------------------------------------

$("#graphButton").click(async function(){
  console.log("Click registered");

  // Get chosen currency from dropdown
  var cc = document.getElementById("currencyCompareGraphDropdown");
  var chosenCurrency = cc.options[cc.selectedIndex].value;

  // Get the minimum exchange from text field
  var minimumExchangeRateValue = document.getElementById("minimumExchange").value;

  // Get the maximum exchange from text field
  var maximumExchangeRateValue = document.getElementById("maximumExchange").value;

  // Testing
  // console.log(chosenCurrency);
  // console.log(minimumExchangeRateValue);
  // console.log(maximumExchangeRateValue);

  // Input sanitation ----------------------------------------------------------

  if ((chosenCurrency == "noValue") || ((isNaN(minimumExchangeRateValue)) || (minimumExchangeRateValue.length == 0)) || ((isNaN(maximumExchangeRateValue)) || (maximumExchangeRateValue.length == 0))) {
    let currencyRatePopup = document.querySelector(".currencyRatePopup");
    currencyRatePopup.style.display = "block";

    // Stops user from scolling (desktop/laptop)
    $('body').addClass('popup-stop-scroll');
  } else {

    // Array to be sent to server
    var currencyGraphData = {chosenCurrency, minimumExchangeRateValue, maximumExchangeRateValue};

    // Content to be sent to server
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currencyGraphData)
    }

    // Sends request to server
    var responseCurrencyGraph = await fetch('/currencyGraph', options);

    var data = await responseCurrencyGraph.json();

    // Post Server Request -----------------------------------------------------

    // Constructs arrays
    var selectedCurrencyArray = data.body.selectedCurrencyArray;
    var exchangeRatesArray = data.body.exchangeRatesArray;

    // Bar graph format
    function BuildBarChart(labels, values, chartTitle) {
      var ctx = document.getElementById("barChart").getContext('2d');
      var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: chartTitle,
            data: values,
            backgroundColor: [
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)',
              'rgba(54, 72, 108, 1)',
              'rgba(61, 81, 121, 1)',
              'rgba(67, 89, 134, 1)',
              'rgba(74, 98, 147, 1)',
              'rgba(80, 107, 160, 1)'  
            ],
            borderColor: 'rgba(54, 72, 108, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Exchange Rates: ' + chosenCurrency,
            fontSize: 30,
            fontColor: 'rgba(54, 72, 108, 1)',
          },
          legend: {
            display: false,
          },
          gridLines: {
            display: false,
          },
          scales:{
            xAxes: [{
                display: false
            }]
          }
        }
      });
      return myBarChart;
    }

    // Creates graph
    var chart = BuildBarChart(selectedCurrencyArray, exchangeRatesArray, "Exchange Rates");

    // Enables and disables buttons
    document.getElementById("graphButton").disabled = true;
    document.getElementById("clearGraphButton").disabled = false;
  } // End of Else statement
}); // End of button

// Clears graph ----------------------------------------------------------------

$("#clearGraphButton").click(function(){
  // Removes content of div
  var barChartContent = document.getElementById('mainContentCentreLeft');
  barChartContent.innerHTML = '';

  // Adds a new canvas to the div
  $('#mainContentCentreLeft').append('<canvas id="barChart"></canvas>');

  // Enables and disables buttons
  document.getElementById("graphButton").disabled = false;
  document.getElementById("clearGraphButton").disabled = true;
}); // End of button
