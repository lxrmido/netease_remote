/**
 * lxrmido@lxrmido.com
 */

var $ = require('nodobjc');
var express = require('express');
var path = require('path');

/**************************************
 **************************************
 * Config Field
 */
/**************************************
 * keycodes related to netease shortcuts
 */
var SC_KEY = {
	PLAY : 49,		// SPACE
	PREV : 123,		// ArrowLeft
	NEXT : 124,		// ArrowRight
	VOLU : 126,		// ArrowUp
	VOLD : 125,		// ArrowDown
	LIKE : 37,		// L
	LRC  : 15		// R
};
/**************************************
 * Service confs
 */
var SVR_PORT = 12111;
/*
 * 
 */
var app = express();
app.listen(SVR_PORT);
$.framework('Cocoa');
app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'remote.html'));
});
app.post('/cmd/play', function(req, res){
	pressWithCmdAlt(SC_KEY.PLAY);
	console.log("Command:'Play' received.");
	res.json({
		code : 1
	});
});
app.post('/cmd/next', function(req, res){
	pressWithCmdAlt(SC_KEY.NEXT);
	console.log("Command:'Next' received.");
	res.json({
		code : 1
	});
});
app.post('/cmd/prev', function(req, res){
	pressWithCmdAlt(SC_KEY.PREV);
	console.log("Command:'Prev' received.");
	res.json({
		code : 1
	});
});
app.post('/cmd/volu', function(req, res){
	pressWithCmdAlt(SC_KEY.VOLU);
	console.log("Command:'Vol Up' received.");
	res.json({
		code : 1
	});
});
app.post('/cmd/vold', function(req, res){
	pressWithCmdAlt(SC_KEY.VOLD);
	console.log("Command:'Vol Down' received.");
	res.json({
		code : 1
	});
});
app.post('/cmd/like', function(req, res){
	pressWithCmdAlt(SC_KEY.LIKE);
	console.log("Command:'Like' received.");
	res.json({
		code : 1
	});
});
app.post('/cmd/lrc', function(req, res){
	pressWithCmdAlt(SC_KEY.LRC);
	console.log("Command:'Lyric' received.");
	res.json({
		code : 1
	});
});

console.log('Start up.');

function pressWithCmdAlt(key){
	
	var dd = $.CGEventCreateKeyboardEvent(null, key, true);
    var du = $.CGEventCreateKeyboardEvent(null, key, false);

    $.CGEventSetFlags(dd, $.kCGEventFlagMaskCommand ^ $.kCGEventFlagMaskAlternate); 
	$.CGEventSetFlags(du, $.kCGEventFlagMaskCommand ^ $.kCGEventFlagMaskAlternate);
	$.CGEventPost($.kCGHIDEventTap, dd);
	$.CGEventPost($.kCGHIDEventTap, du);

}

