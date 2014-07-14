#! /usr/bin/env node
// init IO == identity element, metadata, header, 0
var xE = require('express')()
, yE = require('http')
, xO = require('./posit.json')
, xS = xO.dynDataLoc
// events == operative element, data, body, x
function redirect(xS, xO, xE) {
	var xI
	, xA = xO.paths
	for (xI = 0; xI < xA.length; xI++) {
		if (xS === xA[xI][0]) {
			xE.redirect(xA[xI][1])
			return
		}
	}
	return
}
function response(xO, xE) {
	var yS = xO.url.slice(1)
	, zS = ''
	function collectData(xS) {
		zS += xS
		return
	}
	function compareReqRes() {
		if (yS) redirect(yS, JSON.parse(zS), xE)
		else xE.send(JSON.parse(zS))
		return
	}
	function processGet(xE) {
		xE.setEncoding('utf8')
		xE.on('data', collectData)
		xE.on('end', compareReqRes)
		return
	}
	function errMsg(xO) {
		console.log('error:\n' + JSON.stringify(xO, null, 4))
		return
	}
	yE.get(xS, processGet).on('error', errMsg)
	return
}
function dynIO() {
	var xS = process.env.PORT || 80
	xE.listen(xS, function() {
		console.log('notice:\nlistening on ' + xS)
		return
	})
	return
}
xE.get('/*', response)
dynIO()
