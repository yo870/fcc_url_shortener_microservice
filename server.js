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

app.get("/:timestamp", function (request, response) {
  var today = new Date(request.params.timestamp);
  
  if (!isNaN(request.params.timestamp)) {
    response.send(
      {
        "unix" : Number(request.params.timestamp),
        "natural" : new Date(request.params.timestamp*1000).toDateString()
      }    
    )
  } else if (!isNaN(today)) {
    response.send(
      {
        "unix" : today.getTime() / 1000,
        "natural" : request.params.timestamp
      }    
    )
  } else {
    response.send(
      {
        "unix" : null,
        "natural" : null
      }    
    )
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
