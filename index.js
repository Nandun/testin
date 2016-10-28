var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://compare-u.firebaseio.com",

});


var dbRef = firebase.database().ref('users');

var port = process.env.PORT || 3000;

app.put('/register', function (req, res) {

    var username=req.body.userid;
    var password=req.body.password;
    var firstName=req.body.firstName;
    var lastName=req.body.lastName;

    dbRef.child(username).once("value")
        .then(function (snapshot) {
            if (snapshot.exists()) {
                res.send("1")
            }
            else {
                dbRef.child(username).set({
                    password: password,
                    first_name: firstName,
                    last_name: lastName
                });
                res.send("0")
            }
        });

});

app.put('/login', function (req, res) {
    console.log("Here");
    var user=req.body.userid;
    var pass=req.body.password;
    var dbRef1=dbRef;
    dbRef.child(user).once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            if (pass !== snapshot.child("password").val()) {
                console.log("Invalid password. Retry!");
                res.send("2");
                return;
            } else {
                var datetime = Date();
                console.log("Login Successful!");
                res.send("0");   // Code never reaches here need to investigate
                return;
            }
        } else {
            console.log("Invalid user id. Please signup.");
            res.send("1");
        }
    });

});
app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});
