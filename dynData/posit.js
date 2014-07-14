#! /usr/bin/env node
// init IO <-- identity element, metadata, header, 0
var xE = require('express')()
, xO = require('./posit.json')
// events <-- operative element, data, body, x
function dynIO() {
	var xS = process.env.PORT || xO.port
	xE.listen(xS, function() {
		console.log("notice:\nlistening on " + xS)
		return
	})
	return
}
xE.use(function (xO, xE, yE) {
	console.log('notice:\nres to req with data.json file')
	xE.sendfile('./data.json')
	return
})
dynIO()
