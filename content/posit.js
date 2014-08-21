#! /usr/bin/env node
// head
var X0f = require('fs')
, X0e = require('http')
, x0e = X0e.createServer()
, x0o = require('./posit.json')
, x0s = process.env.PORT || x0o.port
// body
function responseToClient1(x1o, x1e) {
	var x1b = false
	, x1f = X0f.createReadStream(__dirname + '/' + x0o.content)
	function errorGettingFile11(x11o) {
		console.log('error at ' + new Date() + ':\n' + JSON.stringify(x11o, null, 4))
		x1e.statusCode = 404
		x1e.end()
		return
	}
	function collectAndSendFileData12(x12r) {
		x1b = true
		x1e.write(x12r)
		return
	}
	function finishSendingFileData13() {
		if (x1b) {
			x1e.statusCode = 200
			console.log('notice on ' + new Date() + ':\nresponded to request from ' + x1o.connection.remoteAddress + ' with the ' + x0o.content + ' JSON file')
		}
		else {
			x1e.statusCode = 404
			console.log('error at ' + new Date() + ':\n' + JSON.stringify(x0o.content, null, 4))
		}
		x1e.end()
		return
	}
	x1e.setHeader('Content-Type', 'application/json')
	x1e.setHeader('Date', new Date())
	x1f.on('error', errorGettingFile11).on('data', collectAndSendFileData12).on('end', finishSendingFileData13)
	return
}
function beginServiceNotice2() {
	console.log('notice on ' + new Date() + ':\nlistening on ' + x0s)
	return
}
x0e.on('request', responseToClient1)
x0e.listen(x0s, beginServiceNotice2)
