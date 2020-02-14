// Creates a graph of historic rates for a given currency ----------------------

$("#graphButton").click(function(){

  var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

// -----------------------------------

  // console.log("Click registered");
  //
  // var chart = new CanvasJS.Chart("chartContainer", {
  // 	animationEnabled: true,
  // 	theme: "light2",
  // 	title:{
  // 		text: "Currency Rates"
  // 	},
  // 	axisY:{
  // 		includeZero: false
  // 	},
  // 	data: [{
  // 		type: "line",
  // 		dataPoints: [
  // 			{ y: 450 },
  // 			{ y: 414},
  // 			{ y: 520, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
  // 			{ y: 460 },
  // 			{ y: 450 },
  // 			{ y: 500 },
  // 			{ y: 480 },
  // 			{ y: 480 },
  // 			{ y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
  // 			{ y: 500 },
  // 			{ y: 480 },
  // 			{ y: 510 }
  // 		]
  // 	}]
  // });
  // chart.render();

});

// -------------------------------------

  // console.log("Click registered");
  //
  // // URL---------------------------------------
  //
  // // var url = "https://api.exchangeratesapi.io/latest?base="+ chosenCurrencyOne;
  //
  // var url = "https://api.exchangeratesapi.io/history?start_at=2018-01-01&end_at=2018-09-01&base=USD";
  //
  // $.getJSON( url , function(data) {
  //   console.log(data);
  // });
// });
