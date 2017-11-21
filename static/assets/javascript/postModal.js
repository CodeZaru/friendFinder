
//require('./requireMe');
//require('./static/assets/javascript/game');

//var profileAnswersObjTest2 = require('./game.js');

//global.selectFriendGroup;
//selectFriendGroup = "not yet set";//Global that exists on: games.js,  apiRoutes.js and survey.html--which is selected first and how do we make it communicate with all..  I think game.js gets set first..

//????????????????????
//????????????????????
//var friendGroup = '/api/friendsMW';
//????????????????????
//???????????????????

//var friendGroup;// = '/api/friendsMW';


$('#submit').on("click", function() {
	console.log("#hiddenProfileObj: " + $('#hiddenProfileObj').val().trim());
	console.log("#hiddenProfileObj2: " + $('#hiddenProfileObj2').val().trim());
	
	var userInput = {
		hiddenProfileObj: $('#hiddenProfileObj').val().trim(),
		hiddenProfileObj: $('#hiddenProfileObj2').val().trim(),
		name: $('#name').val().trim(),
		photo: $('#photo').val().trim(),
		scores: [$('#questionOne').val().trim(), $('#questionTwo').val().trim(), $('#questionThree').val().trim(), $('#questionFour').val().trim(), $('#questionFive').val().trim(), $('#questionSix').val().trim(), $('#questionSeven').val().trim(), $('#questionEight').val().trim(), $('#questionNine').val().trim(), $('#questionTen').val().trim()]
	}

//the server goes to its ROUTE resource file and sees what to do with a request to this URL path
//when the http method is a POST (like the .post below, in addition it provides userInput variable
//and binds the "data" returned to the various elements of the modal window.)
var currentURL = window.location.origin;
console.log("currentURL: " + window.location.origin);
console.log("#hiddenProfileObj" + $('#hiddenProfileObj').val().trim())
console.log("#hiddenProfileObj2" + $('#hiddenProfileObj2').val().trim())


var friendGroup = $('#hiddenProfileObj2').val().trim();
var selectFriendGroup = $('#hiddenProfileObj').val().trim(); 
//the .post below again goes to the apiRoutes.js file (virtual path to resources),
//provides the userInput, and with the object data returned, it puts the object properties of
//name and photo into the modal elements of #matchName and #matchImage
//'/api/friendsMW'

 //   return friendGroup

console.log('Current URL afterselectFriendGroup: ' + currentURL + friendGroup);

	$.post(currentURL + friendGroup, userInput, function(data) {
//		$.post(currentURL + '/api/friendsMW', userInput, function(data) {
	$("#matchName").text(data.name);
	$("#matchImage").attr("src", data.photo);
	$("#matchModal").modal('toggle');
});
	console.log("friendGroup: " + friendGroup);
	return false;


});

