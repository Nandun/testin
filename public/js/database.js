"use strict";
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAre5UpONItVmRqqoc5ykEUBEzgHUSdwuM",
    authDomain: "compare-u.firebaseapp.com",
    databaseURL: "https://compare-u.firebaseio.com",
    storageBucket: "compare-u.appspot.com",
    messagingSenderId: "896952563705"
};

firebase.initializeApp(config);

function registerUser() {
    var username = $('#registerUsername').val();
    var password = $('#registerPassword').val();
    var firstName = $('#registerFirstName').val();
    var lastName = $('#registerLastName').val();

    var ref = firebase.database().ref("users/" + username);

    ref.once("value")
        .then(function(snapshot) {
            if(snapshot.exists()){
                alert("Username already exists. Please pick a different username, or login");
            }
            else{
                ref.set({
                    password: password,
                    first_name: firstName,
                    last_name: lastName
                });
                $('#registerAlert').html('<div class="alert alert-success" role="alert">Successfully Registered!</div>')

            }
        });
}

function loginUser() {
    var username = $('#inputUsername').val();
    var password = $('#inputPassword').val();

    var ref = firebase.database().ref("users/" + username);

    ref.once("value")
        .then(function(snapshot) {
            if(snapshot.exists() && snapshot.child("password").val() === password){
                $('#loginAlert').html('<div class="alert alert-success" role="alert">Logged in!</div>');
                var current_datetime = Date();
                ref.child('logins').push({datetime : current_datetime});
            }
            else{
                $('#loginAlert').html('<div class="alert alert-danger" role="alert">Username or Password incorrect</div>')
            }

        })
}