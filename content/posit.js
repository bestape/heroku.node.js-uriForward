#! /usr/bin/env node
// head
var X0f = require('fs')
, X0e = require('http')
, x0e = X0e.createServer()
, x0o = require('./posit.json')
, x0s = process.env.PORT || x0o.port
// body
function responseToClient1(x1o, x1e) {
	var x1b = false, y1b = true
	, x1f = X0f.createReadStream(__dirname + '/' + x0o.content)
	function determineIfAllowedClient11() {
		var x11i
		for (x11i = 0; x11i < x0o.whitelist.length; x11i++) {
			if (x0o.whitelist[x11i] === x1o.connection.remoteAddress) return true
			else if (x0o.whitelist.length - 1 === x11i) return false
		}
	}
	function errorGettingFile12(x12o) {
		x1e.statusCode = 404
		x1e.end()
		console.warn('error on ' + new Date() + ':\n' + JSON.stringify(x12o, null, 4))
		return
	}
	function collectAndSendFileData13(x13r) {
		x1b = true
		x1e.write(x13r)
		return
	}
	function finishSendingFileData14() {
		if (x1b) {
			x1e.statusCode = 200
			console.log('notice on ' + new Date() + ':\nresponded to request from ' + x1o.connection.remoteAddress + ' with the ' + x0o.content + ' JSON file')
		}
		else {
			x1e.statusCode = 404
			console.warn('error on ' + new Date() + ':\n' + JSON.stringify(x0o.content, null, 4))
		}
		x1e.end()
		return
	}
	x1e.setHeader('Content-Type', 'application/json')
	x1e.setHeader('Date', new Date())
	if (x0o.whitelist) y1b = determineIfAllowedClient()
	if (y1b) x1f.on('error', errorGettingFile12).on('data', collectAndSendFileData13).on('end', finishSendingFileData14)
	else {
		x1e.statusCode = 404
		x1e.end()
		console.log('on ' + new Date() + ':\nblocked non-whitelist ' + x1o.connection.remoteAddress)
	}
	return
}
function beginServiceNotice2() {
	console.log('notice on ' + new Date() + ':\nlistening on ' + x0s)
	return
}
x0e.on('request', responseToClient1)
x0e.listen(x0s, beginServiceNotice2)
