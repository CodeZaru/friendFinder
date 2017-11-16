//PSUEDO CODE of Next Steps:
//ADD more Variables to handle the generic-ization of route param.
//ADD the conditional logic that makes various routes into one variable
//MODULARIZE the actual working code to apply to and maybe name anonymous functions
//whatever route is passed in the gerenic variable route
//When user sumbits request on survey, it will take them to the same API URL
//regardless, b/c it wants the same answer logic of who is most compatible
//but the mapping to actual data source will change depening on the value of 
//their answer to the first Qs.
//Should probably role the first Q's into the same form so that can use simple jQuery to 
//get the answer to the first Qs..
//Add user's Picture and maybe show the answers to the various Qs on modal.

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on whatever they might..
// ===============================================================================
//require all the sources and name them after the specific source files
var friendsMW = require('../data/friendsMW.js');
var friendsWM = require('../data/friendsWM.js');
var friendsMM = require('../data/friendsMM.js');
var friendsWW = require('../data/friendsWW.js');
var friendsHP = require('../data/friendsD.js');

//NEED TO ADD AND USE conditional logic to variablize the selected source into a generic variable for data source
 
var friendGroupArrayDS = friendsMW; 


// ===============================================================================
// ROUTING--BASICALLY, I SEND YOU TO THIS URL PATH VIA LINK/BUTTON/FORM,
// AND I MAP IT TO THE RESOURCE AT THIS DIRECTORY. 
// GET AND POST METHODS TAKE OUR VIRTUAL URL PATH AS FIRST ARG, AND RETURN
// THE RESOURCE FROM THE ACTUAL DIRECTORY/RESOURCE TO WHICH WE'VE MAPPED THE URL
// ===============================================================================
// API GET Requests
// Below code handles when users "visit" the survey page and post data and await the response.
// The POST maps to a url In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------

var friendGroup = '/api/friendsMW'; 

//Use express() to access friends api
//this whole module basically performs analysis of the user submission and the data 
//in our data source to generate the best answer and output it in the response and 
//send it to...

module.exports = function (app) {
// ---------------------------------------------------------------------------
//In the server definition we have Route code that points the server here to an
//actual file (in this case named apiRoutes.js) on an actual directory.  
//Interestingly, this file points to a set of URl paths that don't actually exist 
//so they are virtual directories as opposed to real directories, but also as URLs
//to whatever resource we associate with the URL path. 
//So the user visits http://~/api/friendsMW by clicking on a hyperlink/button/request or something
//and we respond to them with data/resources that reside on an actual diretory or
//whatever we've mapped to it. For the sake of code we've put /api/friendsMW into 
//a dynamic variable.
// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or 
//request data from various URLs.
// ================================================================================
 //so this virtual directory is a path at which we serve up the tableData json housed 
 //the real diretory address of ../data/tableData and variablized as 'tableData'   



//Using the GET method to grab res data from friends.js holding friends api.  friendGroup is a dynamic variable 
//abstraction of URL path '/api/friendsMW' 
	app.get(friendGroup, function(req, res){
		res.json(friendGroupArrayDS);//data source from generic variable created in code at top--an actual file..
	})

	//Using the POST method to add user answers/choices into friends api
	app.post(friendGroup, function(req, res){

		var user = req.body;

		for(var i = 0; i < user.scores.length; i++) {
			if(user.scores[i] == "1 (Strongly Disagree)") {
				user.scores[i] = 1; //defines 1 as an int
			} else if(user.scores[i] == "5 (Strongly Agree)") {
				user.scores[i] = 5; //defines 5 as an int
			} else {
				user.scores[i] = parseInt(user.scores[i]); //change 2,3, or 4 to an int
			}
		}

		var diffArr = []; //this will be the new .score for the user object in api

		for(var i = 0; i < friendGroupArrayDS.length; i++) {
			
			var diffTotal = 0;
			
			for(var j = 0; j < friendGroupArrayDS[i].scores.length; j++) {
				var diffScore = Math.abs(friendGroupArrayDS[i].scores[j] - user.scores[j]);
				diffTotal += diffScore;
			}
			diffArr[i] = diffTotal;
		}

		var friendNumber = diffArr[0];
		var friendIndex = 0;

		for(var i = 1; i < diffArr.length; i++) {
			if(diffArr[i] < friendNumber) {
				friendNumber = diffArr[i];
				friendIndex = i;
			}
		}

		friendGroupArrayDS.push(user);


		res.json(friendGroupArrayDS[friendIndex]);
	})//end POST
}



