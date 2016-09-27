"use strict";

// Populate select element with Virginia universities
var va_schools = $.ajax("https://api.data.gov/ed/collegescorecard/v1/schools?_fields=school.name,id&_per_page=100&school.main_campus=1&school.state=va&school.degrees_awarded.predominant=3&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU")
    .done(function() {

        var data = va_schools.responseJSON.results;
        var html = '';
        var len = data.length;
        for (var i = 0; i< len; i++) {
            html += '<option value="' + data[i]['id'] + '">' + data[i]['school.name'] + '</option>';
        }
        $('#schoolSelector').append(html);
    });


$('#schoolSelector').change(function()
{
    var selectedSchoolID = $('#schoolSelector').find(":selected").val();
    var selectedSchoolName = $('#schoolSelector').find(":selected").text();

    var res = $.ajax("https://api.data.gov/ed/collegescorecard/v1/schools?id=" + selectedSchoolID +
        "&fields=2014.admissions.admission_rate.overall,2014.admissions.sat_scores.average.overall,2014.student.size&" +
        "&api_key=FNMmHrRzLriPD033jmlA96AOgjmUmKXiRUviDLnU")
    .done(function() {
        var data = res.responseJSON.results[0];

        var admission_rate = (data['2014.admissions.admission_rate.overall'] * 100).toFixed(1);
        var sat_score = data['2014.admissions.sat_scores.average.overall'];
        var num_students = data['2014.student.size'];


        $('#schoolInfo').html('<p>Admission Rate: ' + admission_rate + "%</p>" +
                                '<p>SAT Score: ' + sat_score + '</p>' +
                                '<p>Number of Students: ' + num_students + '</p>');
    });

    // Add selected school to container
    // This code adapted from professor's example
    $('#schoolsList').append(
        '<div class="schoolsItem" data-school-id = ' + selectedSchoolID + '><span> ' + selectedSchoolName + '</span>' +
        '<button onclick="deleteItem(this.parentElement)">Delete School</button></div>'
    );

    $('#radarTitle').html('<h2>' + selectedSchoolName + '</h2>');

    $('.schoolPicture').hide(); //hide all images before showing selected one
});
function deleteItem(divElem){
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