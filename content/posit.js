#! /usr/bin/env node
// init IO <-- identity element, metadata, header, 0
var xE = require('express')()
, xO = require('./posit.json')
, xS = process.env.PORT || xO.port
, yO = require('./data.json') 
// events <-- operative element, data, body, x
function dynIO() {
	xE.listen(xS, function() {
		console.log('notice on ' + new Date() + ':\nlistening on ' + xS)
		return
	})
	return
}
xE.use(function (xO, xE, yE) {
	xE.send(yO)
	console.log('notice on ' + new Date() + ':\nres to req with data.json file')
	return
})
dynIO()
