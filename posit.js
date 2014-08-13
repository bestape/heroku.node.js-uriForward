#! /usr/bin/env node
// init IO == identity element, metadata, header, 0
var x0o = require('./posit.json')
, x0e = require('express')()
, x0f = require('serve-favicon')
, y0f = require('fs')
, y0e = require('http')
, y0o = null
// events == operative element, data, body, x
function redirectClient11211(x11211s, x11211o, x11211e) {
	var x11211i
	, x11211a = x11211o.paths
	, x11211b 
	function compareReqWAvailablePaths112111() {
		if (x11211s === x11211a[x11211i][0]) {
			x11211e.redirect(x11211a[x11211i][1])
			return true
		}
		else if (x11211a.length - 1 === x11211i) {
			x11211e.send(x11211o)
			return false
		}
	}
	for (x11211i = 0; x11211i < x11211a.length; x11211i++) {
		x11211b = compareReqWAvailablePaths112111()
		if (x11211b) break
	}
	return
}
function responseToClient1(x1o, x1e) {
	var x1s = x1o.url.slice(1)
	, y1s = ''
	, y1o = null
	function processClientReq1121() {
		if (x1s) redirectClient11211(x1s, y1o, x1e)
		else x1e.send(JSON.stringify(y1o, null, 4))
		return
	}
	function collectGetReqData111(x111s) {
		y1s += x111s
		return
	}
	function processGetAnswer112() {
		y1o = JSON.parse(y1s)
		y0o = JSON.parse(y1s)
		if (y1o[0].publish) {
			x1e.set('Content-Disposition', 'inline; filename="' + y1o[0].name + '"')
			delete y1o[0]
			processClientReq1121()
		}
		else if (x0o.sansContent.type === 'text') x1e.status(404).send(x0o.sansContent.content)
		else x1e.status(404).sendfile(x0o.sansContent.content)
		return
	}
	function processGetReq11(x11e) {
		x11e.setEncoding('utf8')
		x11e.on('data', collectGetReqData111)
		x11e.on('end', processGetAnswer112)
		return
	}
	function errMsg12(x12o) {
		console.warn('error on ' + new Date() + ':\n' + JSON.stringify(x12o, null, 4))
		if (y0o && y0o[0].publish) {
			y1o = JSON.parse(JSON.stringify(y0o))
			delete y1o[0]
			x1e.send(JSON.stringify(y1o, null, 4))
		}
		else if (x0o.sansContent.type === 'text') x1e.status(404).send(x0o.sansContent.content)
		else x1e.status(404).sendfile(x0o.sansContent.content)
		return
	}
	x1e.set({'Content-Type': 'application/json', 'Date': new Date()})
	if (!x0o.content.local) y0e.get(x0o.content.uri, processGetReq11).on('error', errMsg12)
	return
}
function clientTriggeredIO2() {
	var x2s = process.env.PORT || x0o.port
	x0e.listen(x2s, function() {
		console.log('notice on ' + new Date() + ':\nlistening on ' + x2s)
		return
	})
	return
}
if (x0o.favicon.local) y0f.stat(x0o.favicon.uri, function (x00o) { 
	if (!x00o) x0e.use(x0f(x0o.favicon.uri)) 
	return
})
x0e.get('/*', responseToClient1)
clientTriggeredIO2()
/** notes
 + Function names convey pair information;
   - 1st position consists of a qualitative (cf. absolute, specified) declarative "statement" in natural language;
   - 2nd position consists of a quantitative (cf. relative, generalized) "magnitude".
     + Why?
       - To know where functions are in relation to other functions from an objective position.
	 + what; and
	   - A base ten scale that enumerates function scope within the script;
       - the 0 order of magnitude is the internal scope (cf. micro, addition index, specific) that functions are created in; and
	   - orders of magnitude greater than 0 are the external scope (cf. macro, multiplication index, generic) that functions are created in.
	 + how?
	   - If functions are not nested in other functions because they are called by many functions; 
	     + Their internal scope is 0; and 
		 + their external scope for the functions that calls them is 0.
	   - if funcitons are nested in other functions because they are called by only one function; and
	     + The initial nested function starts at 1 and subsequent functions are naturally ordered; and
		 + their external scope for the function that calls them matches that function's internal scope.
	   - as such, each parent can have a maximum of 9 nested functions.
 + Variable names convey treble information;
   - 1st position consists of an external & generic Cartesian location;
     + Why;
	   - So that the interaction between variables in every function is easy to imagine.
	 + what; and
       - "x", "y" or "z".
     + how.
       - By recognizing that up to three distinct dimensions is the natural spatial plane of the mind; and
	   - as such, any function that requires more dimensions should be split into smaller component functions that can fit in natural space.
   - 2nd position consists of an external & specific function scope scale magnitude; and
     + Why;
       - To be able to quickly reference the function in which variables are initially created.
	 + what; and
	   - The same unique number within the script that variables' parent function defines as its magnitude.
	 + how?
	   - By matching numbers along a fixed real number base ten linear scale.
   - 3rd position consists of an internal & generic code for the types of values that variables can be keys for.
     + Why;
       - To know variables' general properties.
	 + what; and
       - a = array;
	   - b = boolean;
	   - e = event;
	   - f = function;
	   - i = integer;
	   - o = object;
	   - s = string; and
       - u = unknown.
	 + how?
	   - By free association.
**/
