// Creates a graph of historic rates for a given currency ----------------------

$("#graphButton").click(function(){

  console.log("Click registered");

  var chart = new CanvasJS.Chart("chartContainer", {
  	animationEnabled: true,
  	theme: "light2",
  	title:{
  		text: "Currency Rates"
  	},
  	axisY:{
  		includeZero: false
  	},
  	data: [{
  		type: "line",
  		dataPoints: [
  			{ y: 450 },
  			{ y: 414 },
  			{ y: 520 },
  			{ y: 460 },
  			{ y: 450 },
  			{ y: 500 },
  			{ y: 480 },
  			{ y: 480 },
  			{ y: 410 },
  			{ y: 500 },
  			{ y: 480 },
  			{ y: 510 }
  		]
  	}]
  });
  chart.render();

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
