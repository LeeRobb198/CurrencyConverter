// URL

var url = "https://api.exchangeratesapi.io/latest";

// Get JSON data ---------------------------------------------------------------

$.getJSON( url , function(data) {
  console.log("Currency Data");
  console.log(data);
});
