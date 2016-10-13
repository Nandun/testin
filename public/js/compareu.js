"use strict";

// Populate select element with Virginia universities
// var va_schools = $.ajax("https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU")
//     .done(function () {
//         var data = va_schools.responseJSON.results;
//         var html = '';
//         var len = data.length;
//         for (var i = 0; i < len; i++) {
//             html += '<option value="' + data[i]['id'] + '">' + data[i]['school.name'] + '</option>';
//         }
//         $('#schoolSelector').append(html);
//     });
//
// var information = [];
//
// var sat_encoder = d3.scaleLinear()
//     .domain([0, 1600])
//     .range([0, 100]);
//
// var d = [];
// $('#schoolSelector').change(function () {
//     var selectedSchoolID = $('#schoolSelector').find(":selected").val();
//     var selectedSchoolName = $('#schoolSelector').find(":selected").text();
//
//     var res = $.ajax("https://api.data.gov/ed/collegescorecard/v1/schools?id=" + selectedSchoolID +
//         "&fields=2014.admissions.admission_rate.overall,2014.admissions.sat_scores.average.overall,2014.student.size," +
//         "2012.earnings.6_yrs_after_entry.median&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU")
//         .done(function () {
//             var data = res.responseJSON.results[0];
//
//             var admission_rate = Math.round(data['2014.admissions.admission_rate.overall'] * 100);
//             var sat_score = data['2014.admissions.sat_scores.average.overall'];
//             var num_students = data['2014.student.size'];
//             var earnings = data['2012.earnings.6_yrs_after_entry.median'];
//
//
//             information = [
//                 {axis: "Admission rate", value: admission_rate},
//                 {axis: "SAT score", value: sat_encoder(sat_score)},
//                 {axis: "Number of Students", value: num_students / 1000},
//                 {axis: "Earnings", value: earnings / 1000}
//             ];
//
//             d[d.length] = (information);
//             LegendOptions.push(selectedSchoolName);
//             var mycfg = {
//                 w: w,
//                 h: h,
//                 maxValue: 100,
//                 levels: 5,
//                 ExtraWidthX: 300
//             };
//
//             RadarChart.draw("#chart", d, mycfg);
//
// ////////////////////////////////////////////
// /////////// Initiate legend ////////////////
// ////////////////////////////////////////////
//
//             var svg = d3.select('#body')
//                 .selectAll('svg')
//                 .append('svg')
//                 .attr("width", w + 300)
//                 .attr("height", h);
//
// //Create the title for the legend
//             var text = svg.append("text")
//                 .attr("class", "title")
//                 .attr('transform', 'translate(90,0)')
//                 .attr("x", w - 70)
//                 .attr("y", 10)
//                 .attr("font-size", "12px")
//                 .attr("fill", "#404040")
//                 .text("Universities");
//
// //Initiate Legend
//             var legend = svg.append("g")
//                     .attr("class", "legend")
//                     .attr("height", 100)
//                     .attr("width", 200)
//                     .attr('transform', 'translate(90,20)')
//                 ;
// //Create colour squares
//             legend.selectAll('rect')
//                 .data(LegendOptions)
//                 .enter()
//                 .append("rect")
//                 .attr("x", w - 65)
//                 .attr("y", function (d, i) {
//                     return i * 20;
//                 })
//                 .attr("width", 10)
//                 .attr("height", 10)
//                 .style("fill", function (d, i) {
//                     return colorscale(i);
//                 })
//             ;
// //Create text next to squares
//             legend.selectAll('text')
//                 .data(LegendOptions)
//                 .enter()
//                 .append("text")
//                 .attr("x", w - 52)
//                 .attr("y", function (d, i) {
//                     return i * 20 + 9;
//                 })
//                 .attr("font-size", "11px")
//                 .attr("fill", "#737373")
//                 .text(function (d) {
//                     return d;
//                 });
//
//             $('#schoolInfo').html('<p>Admission Rate: ' + admission_rate + "%</p>" +
//                 '<p>SAT Score: ' + sat_score + '</p>' +
//                 '<p>Number of Students: ' + num_students + '</p>');
//         });
//
//     // Add selected school to container
//     // This code adapted from professor's example
//     // $('#schoolsList').append(
//     //     '<div class="schoolsItem" data-school-id = ' + selectedSchoolID + '><span>' + selectedSchoolName + '</span>' +
//     //     '<button onclick="deleteItem(this.parentElement)">Delete School</button></div>'
//     // );
//
//     $('#radarTitle').html('<h2>' + selectedSchoolName + '</h2>');


// });
function deleteItem(divElem) {
    divElem.parentElement.removeChild(divElem);
}

// this code adapted from professor's example
function show(id) {
    if (id) {
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

var colorscale = d3.scaleOrdinal(d3.schemeCategory10);

//Legend titles
var LegendOptions = [];

