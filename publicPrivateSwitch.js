#! /usr/bin/env node
// head
var x0i
, x0f = require('child_process').spawn
, y0f = require('fs')
, x0o = require('./posit.json')
, x0a = x0o.git.specialized
, x0s = '.actual'
// body
function childProcessError1101(x1101o) {
	console.warn(JSON.strigify(x1101o, null, 4))
	return
}
function makeProtoActive111(x111s) {
	x0f('mv', [x111s, x111s + x0s], {stdio: 'inherit'}).on('error', childProcessError1101)
	x0f('cp', [x111s + '.proto', x111s], {stdio: 'inherit'}).on('error', childProcessError1101)
	return
}
function makeActualActive112(x112s) {
	x0f('mv', [x112s + x0s, x112s], {stdio: 'inherit'}).on('error', childProcessError1101)
	return
}
function seeIfActualAlreadyExists1(x1s) {
	function ifFileExistsResponse11(x11o) { 
		if (x11o) makeProtoActive111(x1s)
		else makeActualActive112(x1s)
		return
	}
	y0f.stat(x1s + x0s, ifFileExistsResponse11)
}
for (x0i = 0; x0i < x0a.length; x0i++) {
	seeIfActualAlreadyExists1(x0a[x0i])
}
