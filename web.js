var express = require('express');
var app = express();

app.get('/', function(req, res) {
    var a = req.route.path;
    res.redirect('http://diary.bestape.net' + a)
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});
