var express = require("express");
var bodyParser = require("body-parser");

// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
var app = express();
var PORT = process.env.PORT || 8080;

// BodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// The below code points our server to the route files.


require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Here we start the server

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});