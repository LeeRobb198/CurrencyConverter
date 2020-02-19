var url = "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&base=USD";

$.getJSON( url , function(data) {

  console.log(data);

  var selectedCurrencyHistoryArray = [];

  var datesArray = Object.keys(data.rates);

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
    var currencyHistory = (data.rates[formattedDateArray[i]]['GBP']);
    selectedCurrencyHistoryArray.push(currencyHistory);
  }

  function BuildLineChart(labels, values, chartTitle) {
    var ctx = document.getElementById("myChart").getContext('2d');
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
          text: 'Exchange Rate History: ',
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
        }
      }
    });
    return myLineChart;
  }

  var chart = BuildLineChart(formattedDateArray, selectedCurrencyHistoryArray, "Exchange Rates History");
});
