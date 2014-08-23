#! /usr/bin/env node
var X0f = require('fs')
, X0p = require('stream').Transform
, x0p = new X0p({objectMode: true})
, x0s = __dirname + '/cache.json'
x0p._transform = function processCacheRecord1(x1r) {
	var x1f, x1p = this, x1b = false
	, y1o = JSON.parse(new Buffer(x1r).toString())
	function sendNoFileData100() {
		x1p.push('{"0": {"exists": false}}')
		X0f.unlink(x0s)
		process.exit(0)
		return
	}
	function collectAndSendFileData12(x12s) {
		x1b = true
		x1p.push(x12s)
		return
	}
	function finishCaching13() {
		(x1b) ? process.exit(0) : sendNoFileData100()
		return
	}
	if (y1o[0].exists) {
		x1f = X0f.createWriteStream(x0s)
		x1f.write(JSON.stringify(y1o))
		this.push(JSON.stringify(y1o))
	}
	else if (y1o[0].exists === false) sendNoFileData100()
	else if (y1o[0].cache) {
		x1f = X0f.createReadStream(x0s)
		x1f.setEncoding('utf8')
		x1f.on('error', sendNoFileData100).on('data', collectAndSendFileData12).on('end', finishCaching13)
	}
	else {
		x1f = X0f.createWriteStream(x0s, {flags: 'a'})
		x1f.write(JSON.stringify(y1o))
		this.push(JSON.stringify(y1o))
	}
	return
}
process.stdin
	.pipe(x0p)
	.pipe(process.stdout)
