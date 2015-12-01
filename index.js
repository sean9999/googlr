"use strict";

var rp = require('request-promise');
var color = require('bash-color');

var options = {
	"uri": "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=splendid",
	"headers": {
		"User-Agent": "googlr"
	},
	"json": true
};

rp(options).then(function(payload){

	var results = payload.responseData.results.map(function(row){
		return {
			"title": color.blue(row.titleNoFormatting),
			"url": color.cyan(row.visibleUrl),
			"content": row.content.replace(/<b>([^<]+)<\/b>/g, function(fullmatch,submatch1){
				return color.green(submatch1);
			})
		};
	});

	results.forEach(function(result,i){
		console.log( "\n" + result.title + "\n[" + i + "] " + result.url + "\n" + result.content + "\n" );
	});

}).catch(function(err){
	console.error(err);
});