$("#graphHistoricButton").click(async function(){

  console.log("Click registered");

  // Get chosen currencies from dropdown
  var ccLow = document.getElementById("historicExchangeRateGraphDropdown");
  var chosenCurrency = ccLow.options[ccLow.selectedIndex].value;

  // Get the lowest exchange from text field
  var startDate = document.getElementById("startDate").value;

  // Get the highest exchange from text field
  var endDate = document.getElementById("endDate").value;

  var currencyData = {chosenCurrency, startDate, endDate};

  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(currencyData)
  }

  // Sends request to server with the chosenCurrencyCompare
  var response = await fetch('/historyAPI', options);

  // Returns JSON data from server
  var data = await response.json();

  // Post Server ---------------------------------------------------------------

  var selectedCurrencyHistoryArray = [];

  var datesArray = Object.keys(data.body.rates);

  var unixDateArray = [];

  var formattedDateArray = [];

  // For loop converting date into unix time
  for (var i = 0; i < datesArray.length; i++) {
    var unixDate = Date.parse(datesArray[i]);
    unixDateArray.push(unixDate)
  }

  // Sorting into correct order
  sortedDatesArray = unixDateArray.sort(function(x, y){
    return x - y;
  });

  // Convert back to date format
  for (var i = 0; i < sortedDatesArray.length; i++) {
    var specificDate = new Date(sortedDatesArray[i]);

    var dd = specificDate.getDate();
    var mm = specificDate.getMonth()+1;
    var yyyy = specificDate.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    var formattedDate = yyyy.toString()+'-'+mm+'-'+dd;

    formattedDateArray.push(formattedDate);
  }

  for (var i = 0; i < formattedDateArray.length; i++) {
    var currencyHistory = (data.body.rates[formattedDateArray[i]]['USD']);
    selectedCurrencyHistoryArray.push(currencyHistory);
  }

  // Line Chart Builder
  function BuildLineChart(labels, values, chartTitle) {
    var ctx = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels, // Our labels
        datasets: [{
          label: chartTitle, // Name the series
          data: values, // Our values
          backgroundColor: [ // Specify custom colors
            'rgba(72, 72, 72, 1)',
          ],
          fill: false,
          radius: 2,
          borderColor: 'rgba(64, 64, 64, 1)',
          borderWidth: 2 // Specify bar border width
        }]
      },
      options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
        title: {
          display: true,
          text: 'Exchange Rate History: ' + chosenCurrency,
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
              display: true,
          }]
        },
        elements: {
            line: {
                tension: 0 // disables bezier curves
            }
        }
        // pan: {
        //   enabled: true,
        //   mode: 'xy',
        // },
        // zoom: {
        //   enabled: true,
        //   mode: 'xy', // or 'x' for "drag" version
        // },
      }
    });
    return myLineChart;
  }

  var chart = BuildLineChart(formattedDateArray, selectedCurrencyHistoryArray, "Exchange Rates History");

  document.getElementById("graphHistoricButton").disabled = true;
  document.getElementById("clearHistoricGraphButton").disabled = false;

});

$("#clearHistoricGraphButton").click(function(){
  var lineChartContent = document.getElementById('mainContentBottomRight');
  lineChartContent.innerHTML = '';
  $('#mainContentBottomRight').append('<canvas id="lineChart"></canvas>');

  document.getElementById("graphHistoricButton").disabled = false;
  document.getElementById("clearHistoricGraphButton").disabled = true;
});
