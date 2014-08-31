#! /usr/bin/env node
// head
var X0F = require('fs')
, X0E = require('http')
, x0e = X0E.createServer()
, x0o = require('./posit.json')
, x0s = process.env.PORT || x0o.port
// body
function processClientReq141(x141s, x141e, x141o) {
	var x141i, x141b
	, x141a = x141o.paths
	function compareReqWAvailablePaths1411() {
		if (x141s === x141a[x141i][0]) {
			x141e.statusCode = 301
			x141e.setHeader('Location', x141a[x141i][1])
			x141e.end()
			return true
		}
		else if (x141a.length - 1 === x141i) {
			x141e.statusCode = 404
			x141e.end(JSON.stringify(x141o, null, 4))
			return false
		}
	}
	if (x141s) {
		for (x141i = 0; x141i < x141a.length; x141i++) {
			x141b = compareReqWAvailablePaths1411()
			if (x141b) break
		}
	}
	else x141e.end(JSON.stringify(x141o, null, 4))
	return
}
function responseToClient1(x1o, x1e) {
	var x1f, x1s = '', x1b = false
	, y1s = x1o.url.slice(1)
	, x1p = require('child_process').spawn('node', ['cache.js'])
	x1p.stdout.setEncoding('utf8')
	function processWithoutGetReq10(x10o) {
		console.warn('error on ' + new Date() + ':\n' + JSON.stringify(x10o, null, 4))
		x1p.stdin.write('{"0": {"cache": true}}')
		return
	}
	function sendFavicon111(x, y) {
		if (x) console.warn(x)
		else {
			x1e.setHeader('Content-Type', 'image/x-icon')
			x1e.statusCode = 200
			x1e.end(y)
		}
		return
	}
	function getFavicon11() {
		x1f = X0F.readFile(__dirname + '/content/favicon.ico', sendFavicon111)
		return
	}
	function cachingScriptError12(x12r) {
		console.warn(new Buffer(x12r).toString())
		return
	}
	function getCacheInfo13(x13s) {
		x1s += x13s
		return
	}
	function processCacheInfo14() {
		var x14o = JSON.parse(x1s)
		if (x14o[0].exists) {
			x1e.setHeader('Content-Disposition', 'inline; filename="' + x14o[0].name + '"')
			delete x14o[0]
			processClientReq141(y1s, x1e, x14o)
		}
		else if (x0o.sansContent.type === 'text') {
			x1e.statusCode = 404
			x1e.end(x0o.sansContent.content)
		}
		else {
			x1e.statusCode = 404
			x1e.end('not operational')
		}
		return
	}
	function collectGetReqData151(x151s) {
		x1b = true
		x1p.stdin.write(x151s)
		return
	}
	function processGetAnswer152() {
		x1b ? x1p.stdin.end() : processWithoutGetReq10(x0o.content.uri + ' responded but did not send any data')
		return
	}
	function processGetReq15(x15e) {
		x15e.setEncoding('utf8')
		x15e.on('data', collectGetReqData151).on('end', processGetAnswer152)
		return
	}
	if (y1s === 'favicon.ico') getFavicon11()
	else {
		x1e.setHeader('Content-Type', 'application/json')
		x1e.setHeader('Date', new Date())
		x1p.stderr.on('data', cachingScriptError12)
		x1p.stdout.on('data', getCacheInfo13)
		x1p.on('close', processCacheInfo14)
		if (!x0o.content.internal) X0E.get(x0o.content.uri, processGetReq15).on('error', processWithoutGetReq10)
	}
	return
}
function beginServiceNotice2() {
	console.log('notice on ' + new Date() + ':\nlistening on ' + x0s)
	return
}
x0e.on('request', responseToClient1)
x0e.listen(x0s, beginServiceNotice2)
