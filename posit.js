#! /usr/bin/env node
// init IO == identity element, metadata, header, 0
var xE = require('express')()
, yE = require('http')
, xO = require('./posit.json')
// events == operative element, data, body, x
function redirect(xS, xO, xE) {
	var xI
	, xA = xO.paths
	function compareReqWAvailablePaths() {
		if (xS === xA[xI][0]) xE.redirect(xA[xI][1])
		else if (xA.length - 1 === xI) xE.send(xO)
		return
	}
	for (xI = 0; xI < xA.length; xI++) compareReqWAvailablePaths()
	return
}
function response(yO, xE) {
	var xS = yO.url.slice(1)
	, zS = ''
	function collectData(xS) {
		zS += xS
		return
	}
	function compareReqWRes() {
		if (xS) redirect(xS, JSON.parse(zS), xE)
		else xE.send(JSON.parse(zS))
		return
	}
	function process(xE) {
		xE.setEncoding('utf8')
		xE.on('data', collectData)
		xE.on('end', compareReqWRes)
		return
	}
	function errMsg(yO) {
		console.log('error:\n' + JSON.stringify(yO, null, 4))
		return
	}
	yE.get(xO.dynDataLoc, process).on('error', errMsg)
	return
}
function dynIO() {
	var xS = process.env.PORT || xO.port
	xE.listen(xS, function() {
		console.log('notice:\nlistening on ' + xS)
		return
	})
	return
}
xE.get('/*', response)
dynIO()
