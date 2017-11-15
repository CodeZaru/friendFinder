//PSUEDO CODE of Next Steps:
//ADD more Variables to handle the generic-ization of route param.
//ADD the conditional logic that makes various routes into one variable
//MODULARIZE the actual working code to apply to and maybe name anonymous functions
//whatever route is passed in the gerenic variable route


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
var friendsP = require('../data/friendsD.js');

//use conditional logic to variablize the selected source into a generic variable for data source
var friendGroupArrayDS = friendsMW; 


// ===============================================================================
// ROUTING
// ===============================================================================
// API GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases when a user visits a link
// (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
// ---------------------------------------------------------------------------

var friendGroup = '/api/friendsMW'; 

//Use express() to access friends api
module.exports = function (app) {
	//Using the GET method to grab res data from friends.js holding friends api
	app.get(friendGroup, function(req, res){
		res.json(friendGroupArrayDS);//data source from generic variable created in code at top
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



