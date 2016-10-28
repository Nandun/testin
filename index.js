
var gcloud = require('google-cloud');
var multer = require("multer");
var uploader = multer({ storage: multer.memoryStorage({}) });
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

/**
 * Google cloud storage part
 */
var CLOUD_BUCKET="compare-u.appspot.com"; //From storage console, list of buckets
var gcs = gcloud.storage({
    projectId: '896952563705', //from storage console, then click settings, then "x-goog-project-id"
    keyFilename: 'privkey.json' //the key we already set up
});

function getPublicUrl (filename) {
    return 'https://storage.googleapis.com/' + CLOUD_BUCKET + '/' + filename;
}

var bucket = gcs.bucket(CLOUD_BUCKET);

//From https://cloud.google.com/nodejs/getting-started/using-cloud-storage
function sendUploadToGCS (req, res, next) {
    if (!req.file) {
        return next();
    }

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);


    var stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('error', function (err) {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', function () {
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        var options = {
            entity: 'allUsers',
            role: gcs.acl.READER_ROLE
        };
        file.acl.add(options, function(a,e){next();});//Make file world-readable; this is async so need to wait to return OK until its done
    });

    stream.end(req.file.buffer);
}

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

var dbRef = firebase.database().ref('todos');


//Make a new one
app.post('/todo', uploader.single("img"), sendUploadToGCS, function (req, res, next) {
    var data = {"text" : req.body.todoText};
    if(req.file)
        data.img = getPublicUrl(req.file.cloudStorageObject);
    dbRef.push(data, function () {
        res.send("OK!");
    }).catch(function(){
        res.status(403);
        res.send();
    });
});
//Delete one
app.delete('/todo', function (req, res) {
    console.log("Client wants to delete todo: '" +req.body.key);
    dbRef.child(req.body.key).once("value", function(item){
        if(item.val().text.toLowerCase().includes("lasagna"))
            res.status(403);
        else
        {
            dbRef.child(req.body.key).remove();
            res.send("OK!");
        }
    }).catch(function(){
        res.status(403);
    });
});

app.use(express.static('public'));

app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

