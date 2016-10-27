var firebase = require("firebase");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

var config = {
    apiKey: "AIzaSyAre5UpONItVmRqqoc5ykEUBEzgHUSdwuM",
    authDomain: "compare-u.firebaseapp.com",
    databaseURL: "https://compare-u.firebaseio.com",
    storageBucket: "compare-u.appspot.com",
    messagingSenderId: "896952563705"
};
firebase.initializeApp({
    serviceAccount: "privkey.json",
    databaseURL: "https://compare-82656.firebaseio.com"
});

var dbRef = firebase.database().ref('users');

var port = process.env.PORT || 3000;
//;lm;l,;l,L,;l,;l,;l,;l,;l,

app.put('/login', function (req, res) {
    console.log("Hejbjhbjhre");
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
                window.localStorage.setItem('username', user);
                dbRef1.child(user).push({logintime: datetime});
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
