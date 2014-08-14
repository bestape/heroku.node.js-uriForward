#! /usr/bin/env node
// init IO == identity element, metadata, header, 0
var x0o = require('./posit.json')
, x0e = require('express')()
, x0f = require('serve-favicon')
, y0f = require('fs')
, y0e = require('http')
, y0o = null
// events == operative element, data, body, x
function redirectClient100111(x100111s, x100111e, x100111o) {
	var x100111i, x100111b 
	, x100111a = x100111o.paths
	function compareReqWAvailablePaths1001111() {
		if (x100111s === x100111a[x100111i][0]) {
			x100111e.redirect(x100111a[x100111i][1])
			return true
		}
		else if (x100111a.length - 1 === x100111i) {
			x100111e.send(JSON.stringify(x100111o, null, 4))
			return false
		}
	}
	for (x100111i = 0; x100111i < x100111a.length; x100111i++) {
		x100111b = compareReqWAvailablePaths1001111()
		if (x100111b) break
	}
	return
}
function responseToClient1(x1o, x1e) {
	var x1s = x1o.url.slice(1)
	, y1s = ''
	, y1o = null
	function processClientReq10011() {
		if (x1s) redirectClient100111(x1s, x1e, y1o)
		else x1e.send(JSON.stringify(y1o, null, 4))
		return
	}
	function processGetAnswer1001() {
		if (y1o[0].exists) {
			x1e.set('Content-Disposition', 'inline; filename="' + y1o[0].name + '"')
			delete y1o[0]
			processClientReq10011()
		}
		else if (x0o.sansContent.type === 'text') x1e.status(404).send(x0o.sansContent.content)
		else x1e.status(404).sendfile(x0o.sansContent.content)
		return
	}
	function collectGetReqData111(x111s) {
		y1s += x111s
		return
	}
	function compileGetJsonObject112() {
		y1o = JSON.parse(y1s)
		y0o = JSON.parse(y1s)
		processGetAnswer1001()
		return
	}
	function processGetReq11(x11e) {
		x11e.setEncoding('utf8')
		x11e.on('data', collectGetReqData111)
		x11e.on('end', compileGetJsonObject112)
		return
	}
	function processWithoutGetReq12(x12o) {
		console.warn('error on ' + new Date() + ':\n' + JSON.stringify(x12o, null, 4))
		if (y0o && y0o[0].exists) {
			y1o = JSON.parse(JSON.stringify(y0o))
			processGetAnswer1001()
		}
		else if (x0o.sansContent.type === 'text') x1e.status(404).send(x0o.sansContent.content)
		else x1e.status(404).sendfile(x0o.sansContent.content)
		return
	}
	x1e.set({'Content-Type': 'application/json', 'Date': new Date()})
	if (!x0o.content.internal) y0e.get(x0o.content.uri, processGetReq11).on('error', processWithoutGetReq12)
	return
}
function clientTriggeredInterface2() {
	var x2s = process.env.PORT || x0o.port
	x0e.get('/*', responseToClient1)
	x0e.listen(x2s, function() {
		console.log('notice on ' + new Date() + ':\nlistening on ' + x2s)
		return
	})
	return
}
if (x0o.favicon.internal) y0f.stat(x0o.favicon.uri, function (x00o) { 
	if (!x00o) x0e.use(x0f(x0o.favicon.uri)) 
	return
})
clientTriggeredInterface2()
