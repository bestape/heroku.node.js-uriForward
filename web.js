var express = require('express');
var fs = require('fs');
var app = express();

app.get('/', function(req, res) {
    var buffer = new Buffer(fs.readFileSync('index.html', 'utf-8'));
    res.send(buffer.toString());
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});
