var express = require('express');
var app = express();

app.use(function(req, res, next) {
    var a = 'http://diary.bestape.net' + req.url;
    res.redirect(a);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});
