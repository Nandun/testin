'use strict';

////// REGISTER COMPONENT
var RegClass = React.createClass({
    registerUser: function () {
        var username = $('#registerUsername').val();
        var password = $('#registerPassword').val();
        var firstName = $('#registerFirstName').val();
        var lastName = $('#registerLastName').val();

        var ref = firebase.database().ref("users/" + username);

        ref.once("value")
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    alert("Username already exists. Please pick a different username, or login");
                }
                else {
                    ref.set({
                        password: password,
                        first_name: firstName,
                        last_name: lastName
                    });
                    $('#registerAlert').html('<div class="alert alert-success" role="alert">Successfully Registered!</div>')

                }
            });
    },


    render: function () {
        return (
            <div className="container-fluid">
                <section className="container">
                    <div className="container-page">
                        <div className="col-md-6">
                            <h3 className="dark-grey">Registration</h3>

                            <div className="form-group col-lg-12">
                                <label>Username</label>
                                <input type="text" className="form-control" id="registerUsername"/>
                            </div>

                            <div className="form-group col-lg-12">
                                <label>Password</label>
                                <input type="password" name="" className="form-control" id="registerPassword"/>
                            </div>

                            <div className="form-group col-lg-6">
                                <label>First Name</label>
                                <input type="text" className="form-control" id="registerFirstName"/>
                            </div>

                            <div className="form-group col-lg-6">
                                <label>Last Name</label>
                                <input type="text" name="" className="form-control" id="registerLastName"/>
                            </div>

                            <div className="form-group col-lg-12" id="registerAlert"></div>
                        </div>

                        <div className="col-md-6">
                            <h3>WARNING</h3>
                            <p>Don't use a password that you care about AT ALL. This is not being encrypted,
                                everyone can see it, be smart.</p>
                            <h3 className="dark-grey">Terms and Conditions</h3>
                            <p>
                                By clicking on "Register" you agree to CompareU's Terms and Conditions
                            </p>
                            <p>
                                While rare, prices are subject to change based on exchange rate fluctuations -
                                In the event of such a fluctuation, the maximum price of CompareU will be zero US
                                Dollars.
                            </p>
                            <p>
                                Should there be an error in the description or pricing of a product, we will provide
                                you with a full refund of zero US Dollars.
                            </p>
                            <p>
                                Failure to read these Terms and Conditions will result in an automatic grade of A
                                for CompareU's creators.
                            </p>


                            <button type="submit" className="btn btn-primary" onClick={this.registerUser}>Register
                            </button>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
});

ReactDOM.render(
    <RegClass />,
    document.getElementById('register')
);


////// LOGIN COMPONENT
var LogClass = React.createClass({
    loginUser: function () {
        var username = $('#inputUsername').val();
        var password = $('#inputPassword').val();

        var ref = firebase.database().ref("users/" + username);

        ref.once("value")
            .then(function (snapshot) {
                if (snapshot.exists() && snapshot.child("password").val() === password) {
                    $('#loginAlert').html('<div class="alert alert-success" role="alert">Logged in!</div>');
                    var current_datetime = Date();
                    ref.child('logins').push({datetime: current_datetime});
                }
                else {
                    $('#loginAlert').html('<div class="alert alert-danger" role="alert">Username or Password incorrect</div>')
                }

            })
    },


    render: function () {
        return (
            <div className="container">
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <label htmlFor="inputUsername" className="sr-only">Email address</label>
                    <input type="text" id="inputUsername" className="form-control" placeholder="Username" required
                           autoFocus/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                           required/>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.loginUser}>Sign
                        in
                    </button>
                    <a href="#register" style={{display: "table", margin: "0 auto", fontSize: "large"}}>Register</a>
                </form>
                <div id="loginAlert"></div>
            </div>
        )
    }
});

ReactDOM.render(
    <LogClass />,
    document.getElementById('login')
);


////////COMPARE TOOL COMPONENTS

var Universitycomp = React.createClass({
    getInitialState: function () {
        return {
            options: [],
            selected_schools: [],
            LegendOptions: [],
            currentSchool: {}
        }
    },
    school_select: function () {
        var selectedSchoolID = $('#schoolSelector').find(":selected").val();
        var selectedSchoolName = $('#schoolSelector').find(":selected").text();

        var res = "https://api.data.gov/ed/collegescorecard/v1/schools?id=" + selectedSchoolID +
            "&fields=2014.admissions.admission_rate.overall,2014.admissions.sat_scores.average.overall,2014.student.size," +
            "2012.earnings.6_yrs_after_entry.median&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU";
        $.ajax({
            url: res,
            type: 'GET',
            dataType: 'json',
            cache: true,
            success: function (data) {
                var admission_rate = (data.results[0]['2014.admissions.admission_rate.overall'] * 100).toFixed(1);
                var sat_score = data.results[0]['2014.admissions.sat_scores.average.overall'];
                var num_students = data.results[0]['2014.student.size'];
                var earnings = data.results[0]['2012.earnings.6_yrs_after_entry.median'];

                this.setState({
                    currentSchool: {
                        name: selectedSchoolName,
                        admission_rate: admission_rate,
                        sat_score: sat_score,
                        num_students: num_students,
                        earnings: earnings
                    }
                });

                var information = [
                    {axis: "Admission rate", value: admission_rate},
                    {axis: "SAT score", value: sat_score / 16},
                    {axis: "Number of Students", value: num_students / 500},
                    {axis: "Earnings", value: earnings / 500},
                ];

                this.state.selected_schools[this.state.selected_schools.length] = information;

                this.state.LegendOptions.push(selectedSchoolName);
                var mycfg = {
                    w: w,
                    h: h,
                    maxValue: 100,
                    levels: 5,
                    ExtraWidthX: 300
                };

                RadarChart.draw("#chart", this.state.selected_schools, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

                var svg = d3.select('#chartContainer')
                    .selectAll('svg')
                    .append('svg')
                    .attr("width", w + 300)
                    .attr("height", h);
//Create the title for the legend
                var text = svg.append("text")
                    .attr("class", "title")
                    .attr('transform', 'translate(90,0)')
                    .attr("x", w - 70)
                    .attr("y", 10)
                    .attr("font-size", "12px")
                    .attr("fill", "#404040")
                    .text("Universities");

//Initiate Legend
                var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 100)
                    .attr("width", 200)
                    .attr('transform', 'translate(90,20)');
//Create colour squares
                legend.selectAll('rect')
                    .data(this.state.LegendOptions)
                    .enter()
                    .append("rect")
                    .attr("x", w - 65)
                    .attr("y", function (d, i) {
                        return i * 20;
                    })
                    .attr("width", 10)
                    .attr("height", 10)
                    .style("fill", function (d, i) {
                        return colorscale(i);
                    });
//Create text next to squares
                legend.selectAll('text')
                    .data(this.state.LegendOptions)
                    .enter()
                    .append("text")
                    .attr("x", w - 52)
                    .attr("y", function (d, i) {
                        return i * 20 + 9;
                    })
                    .attr("font-size", "11px")
                    .attr("fill", "#737373")
                    .text(function (d) {
                        return d;
                    });

                // $('#schoolsList').append(
                //     // {/*<SchoolsListElement id={selectedSchoolID} name={selectedSchoolName}/>*/}
                //
                //     '<div class="schoolsItem" data-school-id = ' + selectedSchoolID + '><span> ' + selectedSchoolName + '</span>'
                //     // '<button onClick={deleteItem}> Delete School </button></div>'
                // );
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(URL, status, err.toString());
                alert("Error retrieving data");
            }.bind(this)
        });
    },


    render: function () {
        return (
            <div className="chartcompare">
                <select id="schoolSelector" onChange={this.school_select}>
                    {this.state.options}
                </select>

                {/*<div id="schoolInfo"></div>*/}
                <SchoolInfo data={this.state.currentSchool}/>

                <div id="radar-container">
                    <div id="chartContainer">
                        <div id="chart"></div>
                    </div>
                </div>
            </div>
        );
    },

    componentWillMount: function () {
        var URL = "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU";
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            cache: true,
            success: function (data) {
                for (var i = 0; i < data.results.length; i++) {
                    var sch_id = data.results[i]['id'];
                    var sch_name = data.results[i]['school.name'];
                    this.state.options.push(
                        <option key={i} value={sch_id}> {sch_name} </option>
                    );
                }
                this.forceUpdate();
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(URL, status, err.toString());
                alert("Error retrieving data");
            }.bind(this)
        });
    }
});

// child component of University comp
var SchoolInfo = React.createClass({
        render: function () {
            if (this.props.data.name != undefined) {
                return (
                    <div class="container">
                        <br></br><p><b>{this.props.data.name}</b></p>
                        <p>Admission Rate: {this.props.data.admission_rate}</p>
                        <p>SAT Score: {this.props.data.sat_score}</p>
                        <p>Number of Students: {this.props.data.num_students}</p>
                        <p>Median Earnings: {this.props.data.earnings}</p>
                    </div>
                )
            }
            else return null;
        }
    }
);

ReactDOM.render(
    <Universitycomp />,
    document.getElementById('compare-tool')
);
