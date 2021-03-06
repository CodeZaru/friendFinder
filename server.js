// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var minify = require('express-minify');
var compression = require('compression')
// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// note: we will be deploying to the Heroku Cloud PAAS 
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We'll use this later in our listener
// Set dynamic port first..
var PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'static')));
//app.use(express.static('static'));


//????????????????????????????????????????????????????????
//NOTE: set "selectFriendGroup" as Global Variable by excluding Var from declaration
//but had to set it in two different Javascript files: game.js 
//and survey.html--javascript piece, so that I could pass variable from 
//my static dir to my route api dir.
//Didn't need it here on the express server.js file
//selectFriendGroup = "Man looking for Woman";//????????????
//?????????????????????????????????????????????????????????



// ==============================================================================
// INSTRUCT THE SERVER "app" TO USE VARIOUS RESOURCES LIKE MIDDLEWARE AND
// SERVER API ROUTE DEFINITIONS 

// Note: If you don’t have the bodyParser middleware the server won’t 
// understand your POST…,  that is very important two lines b/c the 
// method of POST sends to server, need server to understand.

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));//true/false kakunin shinai to..
app.use(bodyParser.json());
app.use(bodyParser.text());

// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or 
//  request data from various URLs.
// ================================================================================
// ROUTES
require('./app/routing/apiRoutes.js')(app); 
require('./app/routing/htmlRoutes.js')(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function(){
	console.log("App listening on PORT: " + PORT);
});

