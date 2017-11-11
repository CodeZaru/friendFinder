// Includes two routes:
// GET route to "/survey" path to survey.html
// USE route to "/" path to home.html
// Use the built in "path" 
var path = require('path');

module.exports = function(app) {
	app.get('/survey', function(req, res){
		res.sendFile(path.join(__dirname, '/../public/survey.html'));
	});

	app.use(function(req, res){
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});

}