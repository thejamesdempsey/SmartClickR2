
/*
 * GET home page.
 */

// GET /index //
exports.index = function(request, response){
	response.render('index.jade', { title: 'SmartClickR | Welcome' });
};


// GET /features //
exports.features = function(request, response) {
	response.render('features.jade', { title: 'SmartClickR | Polling and Presentation Features' });
}


