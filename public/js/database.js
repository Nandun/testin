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
}/**
 * Created by red on 10/2/2016.
 */


    var RegClass = React.createClass({
        render: function () {
            return (
                <div className="RegClass">
                    <div class="container-fluid">
                        <section class="container">
                            <div class="container-page">
                                <div class="col-md-6">
                                    <h3 class="dark-grey">Registration</h3>

                                    <div class="form-group col-lg-12">
                                        <label>Username</label>
                                        <input type="text" class="form-control" id="registerUsername"/>
                                    </div>

                                    <div class="form-group col-lg-12">
                                        <label>Password</label>
                                        <input type="password" name="" class="form-control" id="registerPassword"/>
                                    </div>

                                    <div class="form-group col-lg-6">
                                        <label>First Name</label>
                                        <input type="text" class="form-control" id="registerFirstName"/>
                                    </div>

                                    <div class="form-group col-lg-6">
                                        <label>Last Name</label>
                                        <input type="text" name="" class="form-control" id="registerLastName"/>
                                    </div>

                                    <div class="form-group col-lg-12" id="registerAlert"></div>
                                </div>

                                <div class="col-md-6">
                                    <h3>WARNING</h3>
                                    <p>Don't use a password that you care about AT ALL. This is not being encrypted, everyone can see it, be smart.</p>
                                    <h3 class="dark-grey">Terms and Conditions</h3>
                                    <p>
                                        By clicking on "Register" you agree to CompareU's Terms and Conditions
                                    </p>
                                    <p>
                                        While rare, prices are subject to change based on exchange rate fluctuations -
                                        In the event of such a fluctuation, the maximum price of CompareU will be zero US Dollars.
                                    </p>
                                    <p>
                                        Should there be an error in the description or pricing of a product, we will provide you with a full refund of zero US Dollars.
                                    </p>
                                    <p>
                                        Failure to read these Terms and Conditions will result in an automatic grade of A for CompareU's creators.
                                    </p>


                                    <button type="submit" class="btn btn-primary" onClick={registerUser}>Register</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            );
        }
    });

 ReactDOM.render(
 <RegClass />,
 document.getElementById('RegPage')
 );


var LogClass = React.createClass({
    render: function() {
        return (
            <div className="logClass">
                <div class="container">
                    <div id="loginAlert"></div>

                <div class="panel" id="login">
                <h2 >Please sign in</h2>
                <div><input type="text" id="inputUsername" placeholder="Username" /> </div>
                <div><input type="password" id="inputPassword" placeholder="Password" /></div>
                <button  type="submit" onClick={loginUser}>Sign in</button>
                <a href="#register">Register</a>
                <div id="loginAlert"></div>
                </div>
                </div>
            </div>
        );
    }
});
        ReactDOM.render(
    <LogClass />,
    document.getElementById('loginpage')
);

