const express = require('express')
const app = express()

app.use(express.static(__dirname)); // Get the html, js, css and image files

// Send the index page
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
})

// Listen to the server on port 80
app.listen(80, function () {
  console.log('Example app listening on port 80! Go to https://localhost:80/')
})
