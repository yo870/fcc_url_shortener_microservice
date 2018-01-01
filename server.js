// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set("view engine", "ejs");

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render("index");
});

app.get("/new/:address", function (request, response) {
  var address = request.params.address;
  
  if (!isNaN(address)) {
    
  } else {
    
  }
  
});

app.get("/:short", function (request, response) {
  var short = request.params.short;
  
  if (!isNaN(short)) {
    
  } else {
    
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
