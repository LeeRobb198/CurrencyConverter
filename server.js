const express = require('express')
const app = express()

app.use(express.static(__dirname)); // Get the html, js, css and image files
app.use(express.json());

// Send the index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

// Post Method -----------------------------------------------------------------

app.post('/testAPI', function (req, res) {
  var test = req.body;
  console.log(test);
});


// Listen to the server on port 80 ---------------------------------------------

app.listen(80, function () {
  console.log('Example app listening on port 80! Go to https://localhost:80/')
})
