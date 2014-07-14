#! /usr/bin/env node
// init IO <-- identity element, metadata, header, 0
var xE = require('express')()
, xO = require('./posit.json')
, yO = require('./data.json') 
, xS = process.env.PORT || xO.port
// events <-- operative element, data, body, x
function dynIO() {
	xE.listen(xS, function() {
		console.log("notice:\nlistening on " + xS)
		return
	})
	return
}
xE.use(function (xO, xE, yE) {
	xE.send(yO)
	console.log('notice:\nres to req with data.json file on ' + new Date())
	return
})
dynIO()
