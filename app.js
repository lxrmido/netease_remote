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
app.post('/cmd/:action', function(req, res){
	var action_key_map = {
		play : SC_KEY.PLAY,
		prev : SC_KEY.PREV,
		next : SC_KEY.NEXT,
		volu : SC_KEY.VOLU,
		vold : SC_KEY.VOLD,
		like : SC_KEY.LIKE,
		lrc  : SC_KEY.LRC,
	};
	if(action_key_map[req.params.action]){
		console.log('Key `' + req.params.action + '` pressed.');
		pressWithCmdAlt(action_key_map[req.params.action]);
		res.json({
			code : 1
		});
	}else{
		res.json({
			code : -404,
			message : 'Action Not Found.'
		});
	}
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

