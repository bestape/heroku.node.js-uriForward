#! /usr/bin/env node
// init IO == identity element, metadata, header, 0
var x0o = require('./posit.json')
, x0a = x0o.git.specialized
, x0f = require('child_process').spawn
, y0f = require('fs')
, x0s = '.actual'
, x0i
// events == operative element, data, body, x
function childProcessError101(x101o) {
	console.warn(JSON.strigify(x101o, null, 4))
	return
}
function makeProtoActive11(x11s) {
	x0f('mv', [x11s, x11s + x0s], {stdio: 'inherit'}).on('error', childProcessError101)
	x0f('cp', [x11s + '.proto', x11s], {stdio: 'inherit'}).on('error', childProcessError101)
	return
}
function makeActualActive12(x12s) {
	x0f('mv', [x12s + x0s, x12s], {stdio: 'inherit'}).on('error', childProcessError101)
	return
}
function seeIfActualAlreadyExists1(x1s) {
	y0f.stat(x1s + x0s, function (x00o) { 
		if (x00o) makeProtoActive11(x1s)
		else makeActualActive12(x1s)
		return
	})
}
for (x0i = 0; x0i < x0a.length; x0i++) {
	seeIfActualAlreadyExists1(x0a[x0i])
}
