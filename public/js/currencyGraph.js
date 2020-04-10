// -----------------------------------------------------------------------------
// Creates a graph of exchange rates against a given currency JS ---------------
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

    // Post Server Request -------------------------------------------------------

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
              'rgba(72, 72, 72, 1)',
              'rgba(80, 80, 80, 1)',
              'rgba(88, 88, 88, 1)',
              'rgba(96, 96, 96, 1)',
              'rgba(104, 104, 104, 1)',
              'rgba(105, 105, 105, 1)',
              'rgba(112, 112, 112, 1)',
              'rgba(120, 120, 120, 1)',
              'rgba(128, 128, 128, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(144, 144, 144, 1)',
              'rgba(152, 152, 152, 1)',
              'rgba(160, 160, 160, 1)',
              'rgba(168, 168, 168, 1)',
              'rgba(169, 169, 169, 1)',
              'rgba(176, 176, 176, 1)',
              'rgba(184, 184, 184, 1)',
              'rgba(190, 190, 190, 1)',
              'rgba(192, 192, 192, 1)',
              'rgba(200, 200, 200, 1)',
              'rgba(72, 72, 72, 1)',
              'rgba(80, 80, 80, 1)',
              'rgba(88, 88, 88, 1)',
              'rgba(96, 96, 96, 1)',
              'rgba(104, 104, 104, 1)',
              'rgba(105, 105, 105, 1)',
              'rgba(112, 112, 112, 1)',
              'rgba(120, 120, 120, 1)',
              'rgba(128, 128, 128, 1)',
              'rgba(136, 136, 136, 1)',
              'rgba(144, 144, 144, 1)',
              'rgba(152, 152, 152, 1)'
            ],
            borderColor: 'rgba(64, 64, 64, 1)',
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
            fontColor: 'rgba(64, 64, 64, 1)',
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
  }
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
