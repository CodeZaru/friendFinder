// Includes two routes:
// GET route to "/api/friends" to get from friends.js 

// Grab the saved data from friends array of friend profile objects
var friendArr = require('../data/friendsMW.js');

//PSUEDO CODE
//ADD more Variables to handle the generic-ization of route param.
//ADD the conditional logic that makes various routes into one variable
//MODULARIZE the actual working code to apply to and maybe name anonymous functions
//whatever route is passed in the gerenic variable route
var friendGroup = '/api/friendsMW'; 

//Use express() to access friends api
module.exports = function (app) {
	//Using the GET method to grab res data from friends.js holding friends api
	app.get(friendGroup, function(req, res){
		res.json(friendArr);
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

		for(var i = 0; i < friendArr.length; i++) {
			
			var diffTotal = 0;
			
			for(var j = 0; j < friendArr[i].scores.length; j++) {
				var diffScore = Math.abs(friendArr[i].scores[j] - user.scores[j]);
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

		friendArr.push(user);


		res.json(friendArr[friendIndex]);
	})//end POST
}



