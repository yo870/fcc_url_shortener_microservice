// init project
var express = require('express');
var app = express();
var fetch = require('node-fetch');
var mongoose = require("mongoose");

mongoose.connect("mongodb://" + process.env.USER + ":" + process.env.SECRET + "@ds235877.mlab.com:35877/url_shortener",{ useMongoClient: true });

var urlSchema = new mongoose.Schema({
   original_url: String,
   short_url: Number,
});

var url = mongoose.model("URL", urlSchema);
var maxAddress;

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.set("view engine", "ejs");

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.render("index");
});

app.get("/new/*", function (request, response) {
  var address = request.originalUrl.slice(5);
  console.log(address);
  //fetch(address).then(function(response) {
  //  if (response.ok) {
      var check = url.findOne({'original_url': "max"});
      check.then(function (data) {

        if (isNaN(address)) {
          var newAddress = new url({
           original_url: address,
           short_url: data.short_url + 1
          });
          newAddress.save(function (err, data) {
            if (err) {
              response.send(err);  
            } else {
              console.log(data.short_url);
              url.update({'original_url': "max"}, {'short_url': data.short_url},  function (err, data) { 
                if (err) {
                  response.send(err)
                } else {
                  response.send(
                    {
                    original_url: newAddress.original_url,
                    short_url: newAddress.short_url,  
                    }
                  );   
                }
              });
            }
          });


        } else {
          response.send("Error: The url must be valid. To use a shortened url, please use '/[your shortened address]'"); 
        }

      }).catch(function (err) {
        response.send(err);
      });
      
   // } else {
      //response.send("Error: This webpage does not exist");
   // }
      
  //}); //End of Fetch
});

app.get("/:short", function (request, response) {
  var short = request.params.short;
  
  if (!isNaN(short)) {    
    url.findOne({ 'short_url': short, 'original_url': {$ne : "max"}},  function (err, person) {
      if (err) {
        response.send(err);  
      } else {
        if (!person) {
          response.send("Error: The shortened url could not be found");  
        } else {
          response.redirect(person.original_url);
        }
      }
    });
  } else {
    response.send("Error: The shortened url must be a number");
  };     
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
 