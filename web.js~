var express = require('express');
var fs = require('fs');
var app = express();

var users = function(user, pass){
    var userList = {
	"user": [{
	    "username": "user1",
	    "password": "helloworld"
	}, {
	    "username": "user2",
	    "password": "helloworld"
	}]
    };
    for (var i = 0; i < userList.user.length; i++) {
	var potentialUsername = userList.user[i].username;
	var potentialPassword = userList.user[i].password;
	if (user === potentialUsername && pass === potentialPassword) {
	    return true;
	}
    }
};

var basicAuthMessage = "username and password please";

app.use(express.basicAuth(function(user, pass) {
    var validUser = users(user, pass);
    if (validUser) { return true; }
    else { return false; }
}, basicAuthMessage));

app.get('/', function(req, res) {
    var buffer = new Buffer(fs.readFileSync('index.html', 'utf-8'));
    res.send(buffer.toString());
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on " + port);
});
