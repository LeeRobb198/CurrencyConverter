// Creates a graph of historic exchange rates against a given currency ---------

$("#graphHistoricButton").click(async function(){
  console.log("Click registered");

  // Get chosen currency from dropdown
  var cc = document.getElementById("historicExchangeRateGraphDropdown");
  var chosenCurrency = cc.options[cc.selectedIndex].value;

  // Get chosen comparison currency from dropdown
  var ccc = document.getElementById("historicExchangeRateGraphDropdownComparison");
  var chosenComparisonCurrency = ccc.options[ccc.selectedIndex].value;

  // Get the start date
  var startDate = document.getElementById("startDate").value;

  // Get the end date
  var endDate = document.getElementById("endDate").value;

  // Array to be sent to server
  var currencyData = {chosenCurrency, chosenComparisonCurrency, startDate, endDate};

  // What will be sent / method used to the server
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(currencyData)
  }

  // Sends request to server
  var response = await fetch('/historyAPI', options);

  // // Returns JSON data from server
  // var data = await response.json();
  //
  // // Post Server Request -------------------------------------------------------
  //
  // // // Constructs arrays
  // var selectedCurrencyHistoryArray = [];
  // var datesArray = Object.keys(data.body.rates);
  // var unixDateArray = [];
  // var formattedDateArray = [];
  //
  // // For loop converting date into unix time
  // for (var i = 0; i < datesArray.length; i++) {
  //   var unixDate = Date.parse(datesArray[i]);
  //   unixDateArray.push(unixDate)
  // }
  //
  // // Sorting dates in order
  // sortedDatesArray = unixDateArray.sort(function(x, y){
  //   return x - y;
  // });
  //
  // // Convert back to date format
  // for (var i = 0; i < sortedDatesArray.length; i++) {
  //   var specificDate = new Date(sortedDatesArray[i]);
  //
  //   var dd = specificDate.getDate();
  //   var mm = specificDate.getMonth()+1;
  //   var yyyy = specificDate.getFullYear();
  //
  //   if (dd < 10) {
  //     dd = "0" + dd;
  //   }
  //
  //   if (mm < 10) {
  //     mm = "0" + mm;
  //   }
  //
  //   // Formats date to yyyy-mm-dd
  //   var formattedDate = yyyy.toString()+'-'+mm+'-'+dd;
  //
  //   // Adds formatted date to array to be used in graph
  //   formattedDateArray.push(formattedDate);
  // }

  // Retrieves exchange rate of given date
  // for (var i = 0; i < formattedDateArray.length; i++) {
  //   var currencyHistory = (data.body.rates[formattedDateArray[i]][chosenComparisonCurrency]);
  //   selectedCurrencyHistoryArray.push(currencyHistory);
  // }

  var data = await response.json();

  console.log(data);

  // Post Server Request -------------------------------------------------------

  // // Constructs arrays
  var formattedDateArray = data.body.formattedDateArray;
  var selectedCurrencyHistoryArray = data.body.selectedCurrencyHistoryArray;
  // var datesArray = Object.keys(data.body.rates);

  // Line graph format
  function BuildLineChart(labels, values, chartTitle) {
    var ctx = document.getElementById("lineChart").getContext('2d');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: chartTitle,
          data: values,
          backgroundColor: [
            'rgba(72, 72, 72, 1)',
          ],
          fill: false,
          radius: 2,
          borderColor: 'rgba(64, 64, 64, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Exchange Rate History: ' + chosenCurrency + ' Against ' + chosenComparisonCurrency,
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
                tension: 0
            }
        },
      }
    });
    return myLineChart;
  }

  // Creates graph
  var chart = BuildLineChart(formattedDateArray, selectedCurrencyHistoryArray, "Exchange Rates History");

  // Enables and disables buttons
  document.getElementById("graphHistoricButton").disabled = true;
  document.getElementById("clearHistoricGraphButton").disabled = false;

}); // End button

$("#clearHistoricGraphButton").click(function(){
  // Removes content of div
  var lineChartContent = document.getElementById('mainContentBottomRight');
  lineChartContent.innerHTML = '';

  // Adds a new canvas to the div
  $('#mainContentBottomRight').append('<canvas id="lineChart"></canvas>');

  // Enables and disables buttons
  document.getElementById("graphHistoricButton").disabled = false;
  document.getElementById("clearHistoricGraphButton").disabled = true;
}); // End button
