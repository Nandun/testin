"use strict";

// Populate select element with Virginia universities



var information = [];

var d = [
    [
        {axis:"Admission rate",value:0},
        {axis:"SAT score",value:0},
        {axis:"number of students",value:0},
        {axis:"test",value:0},
    ],
];
var selectedSchoolID;
var selectedSchoolName ;
var admission_rate ;
var sat_score ;
var num_students;
var dlen = 1;
function school_select() {
    selectedSchoolID = $('#schoolSelector').val();


    var res = "https://api.data.gov/ed/collegescorecard/v1/schools?id=" + selectedSchoolID +
        "&fields=school.name,2014.admissions.admission_rate.overall,2014.admissions.sat_scores.average.overall,2014.student.size&" +
        "&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU";
    $.ajax({
        url: res,
        type: 'GET',
        dataType: 'json',
        cache: true,
        success: function (data) {
            selectedSchoolName = data.results[0]['school.name'];
            admission_rate = (data.results[0]['2014.admissions.admission_rate.overall'] * 100).toFixed(1);
            sat_score = data.results[0]['2014.admissions.sat_scores.average.overall'];
            num_students = data.results[0]['2014.student.size'];

            school_select_d3();
            //this.forceUpdate();
        }.bind(this),
        error: function (xhr, status, err) {
            console.error(URL, status, err.toString());
            alert("Error retrieving data");
        }.bind(this)
    });
}

function school_select_d3() {

          information =  [
                {axis:"Admission rate",value:admission_rate*1000},
                {axis:"SAT score",value:sat_score*10},
                {axis:"number of students",value:num_students},
              {axis:"test",value:90},
            ]
            d[d.length] = (information);
            LegendOptions.push(selectedSchoolName);
            var mycfg = {
                w: w,
                h: h,
                maxValue: 0.6,
                levels: 6,
                ExtraWidthX: 300
            }

            RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
//////////////////////////////////////////// 

            var svg = d3.select('#body')
                .selectAll('svg')
                .append('svg')
                .attr("width", w+300)
                .attr("height", h)

//Create the title for the legend
            var text = svg.append("text")
                .attr("class", "title")
                .attr('transform', 'translate(90,0)')
                .attr("x", w - 70)
                .attr("y", 10)
                .attr("font-size", "12px")
                .attr("fill", "#404040")
                .text("University Statistics");

//Initiate Legend
            var legend = svg.append("g")
                    .attr("class", "legend")
                    .attr("height", 100)
                    .attr("width", 200)
                    .attr('transform', 'translate(90,20)')
                ;
//Create colour squares
            legend.selectAll('rect')
                .data(LegendOptions)
                .enter()
                .append("rect")
                .attr("x", w - 65)
                .attr("y", function(d, i){ return i * 20;})
                .attr("width", 10)
                .attr("height", 10)
                .style("fill", function(d, i){ return colorscale(i);})
            ;
//Create text next to squares
            legend.selectAll('text')
                .data(LegendOptions)
                .enter()
                .append("text")
                .attr("x", w - 52)
                .attr("y", function(d, i){ return i * 20 + 9;})
                .attr("font-size", "11px")
                .attr("fill", "#737373")
                .text(function(d) { return d; })
            ;

    $('#schoolInfo').html('<p>Admission Rate: ' + admission_rate + "%</p>" +
        '<p>SAT Score: ' + sat_score + '</p>' +
        '<p>Number of Students: ' + num_students + '</p>');

    // Add selected school to container
    // This code adapted from professor's example

    $('#schoolsList').append(
        '<div class="schoolsItem" data-school-id = ' + selectedSchoolID + '><span> ' + selectedSchoolName + '</span>' +
        '<button onClick={deleteItem}> Delete School </button></div>'

    );

    $('#radarTitle').html('<h2>' + selectedSchoolName + '</h2>');

    $('.schoolPicture').hide(); //hide all images before showing selected one

};


function deleteItem() {
    divElem.parentElement.removeChild(divElem);
}

// this code adapted from professor's example
function show(id) {
    if(id){
        $('.panel')//Select all elements with panel class
            .hide() //Hide all of them
            .filter(id) //Select just the one with the given id
            .show(); //Unhide it
    }
    else {
        $('.panel')//Select all elements with panel class
            .hide() //Hide all of them
            .filter('#landing') //Select just the one with the given id
            .show(); //Unhide it
    }
}

//Set a listener so that when we change the #... part of it, we call the function above
$(window).on('hashchange', function () {
    show(location.hash);
});

// initialise by showing the first panel
show('#landing');

var w = 500,
    h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = [];


var URL= "https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU";
var Universitycomp = React.createClass({
    getInitialState: function () {
        return {
            options: []
        }
    },
    render: function () {
        return (
            <div className="chartcompare">
                    <select id="schoolSelector" onChange={school_select}>
                        {this.state.options}
                    </select>

                <div id="schoolsList"></div>

                <div id="radarTitle"></div>

                <div id="schoolInfo"></div>

                <div id="radar-container"></div>
                <div id="body">
                    <div id="chart"></div>
                </div>
            </div>
        );
    },

    componentWillMount: function () {
     //   user = localStorage.getItem('username');
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            cache: true,
            success: function(data) {
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

ReactDOM.render(
    <Universitycomp />,
    document.getElementById('compareChart')


);
