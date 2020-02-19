// Creates a graph of exchange rates against a given currency ----------------------

$("#graphButton").click(function(){

  console.log("Click registered");

  // Get chosen currencies from dropdown
  var ccLow = document.getElementById("currencyCompareGraphDropdown");
  var chosenCurrency = ccLow.options[ccLow.selectedIndex].value;

  // Get the lowest exchange from text field
  var minimumExchangeRateValue = document.getElementById("minimumExchange").value;

  // Get the highest exchange from text field
  var maximumExchangeRateValue = document.getElementById("maximumExchange").value;

  // URL---------------------------------------

  var url = "https://api.exchangeratesapi.io/latest?base="+ chosenCurrency;

  $.getJSON( url , function(data) {

    var selectedCurrencyArray = [];
    var exchangeRatesArray = [];

    ratesArray = data.rates;

    currencyArray = ["GBP", "EUR", "USD", "CAD", "HKD", "ISK", "PHP", "DKK"
                    , "HUF", "CZK", "AUD", "RON", "SEK", "IDR", "INR", "BRL"
                    , "RUB", "HRK", "JPY", "THB", "CHF", "SGD", "PLN", "BGN"
                    , "TRY", "CNY", "NOK", "ZAR", "MXN", "ILS", "KRW", "MYR"]

    fullNameCurrency = {"GBP": "Pound Sterling - GBP", "EUR": "Euro - EUR"
                    , "USD": "United States Dollar - USD", "CAD": "Canadian Dollar - CAD"
                    , "HKD": "Hong Kong Dollar - HKD", "ISK": "Icelandic Krona - ISK"
                    , "PHP": "Philippine Peso - PHP", "DKK": "Danish Krone - DKK"
                    , "HUF": "Hungarian Forin - HUF", "CZK": "Czech Koruna - CZK"
                    , "AUD": "Australian Dollar - AUD", "RON": "Romanian Leu - RON"
                    , "SEK": "Swedish Krona - SEK", "IDR": "Indonesian Rupiah - IDR"
                    , "INR": "Indian Rupee - INR", "BRL": "Brazilian Real - BRL"
                    , "RUB": "Russian Ruble - RUB", "HRK": "Croatian Kuna - HRK"
                    , "JPY": "Japanese Yen - JPY", "THB": "Thai Baht - THB"
                    , "CHF": "Swiss Franc - CHF", "SGD": "Singapore Dollar - SGD"
                    , "PLN": "Poland Złoty - PLN", "BGN": "Bulgarian Lev - BGN"
                    , "TRY": "Turkish Lira - TRY", "CNY": "Chinese Yuan - CNY"
                    , "NOK": "Norwegian Krone - NOK", "ZAR": "New Zealand Dollar - ZAR"
                    , "MXN": "Mexican Peso - MXN", "ILS": "Israeli New Shekel - ILS"
                    , "KRW": "South Korean Won - KRW", "MYR": "Malaysian Ringgit - MYR"};

    for (var i = 0; i < currencyArray.length; i++) {
      if ((ratesArray[currencyArray[i]] > minimumExchangeRateValue) && (ratesArray[currencyArray[i]] < maximumExchangeRateValue)) {
        if (currencyArray[i] !== chosenCurrency) {
          var fullRate = ratesArray[currencyArray[i]];

          rounded2DecRate = Math.round(fullRate * 100) / 100;

          selectedCurrencyArray.push(fullNameCurrency[currencyArray[i]]);
          exchangeRatesArray.push(rounded2DecRate);
        }
      }
    }

    function BuildBarChart(labels, values, chartTitle) {
      var ctx = document.getElementById("myChart").getContext('2d');
      var myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels, // Our labels
          datasets: [{
            label: chartTitle, // Name the series
            data: values, // Our values
            backgroundColor: [ // Specify custom colors
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
            borderWidth: 1 // Specify bar border width
          }]
        },
        options: {
          responsive: true, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behavior of full-width/height
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
                display: false //this will remove all the x-axis grid lines
            }]
          }
        }
      });
      return myBarChart;
    }

    var chart = BuildBarChart(selectedCurrencyArray, exchangeRatesArray, "Exchange Rates");
  });

  document.getElementById("graphButton").disabled = true;
  document.getElementById("clearGraphButton").disabled = false;

});

$("#clearGraphButton").click(function(){
  var barChartContent = document.getElementById('mainContentBottomLeft');
  barChartContent.innerHTML = '';
  $('#mainContentBottomLeft').append('<canvas id="myChart"></canvas>');

  document.getElementById("graphButton").disabled = false;
  document.getElementById("clearGraphButton").disabled = true;
});
