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

function writeUserData() {

    var username = $('#registerUsername').val();
    var password = $('#registerPassword').val();
    var email = $('#registerEmail').val();

    firebase.database().ref('users/' + username).set({
        email: email,
        password: password
    });
}