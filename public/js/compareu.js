var addedNumber = 0; //global variable keeps track of how many times a school has been added

$('#schoolSelector').change(function()
{
    var selectedSchool = $('#schoolSelector').find(":selected").text();
    var schoolID = selectedSchool.replace(/ /g,'');  // strip whitespace to match ID of images

    // Add selected school to container, and increment the data-added-number property
    // This code adapted from Professor's todo list example
    $('#schoolsList').append(
        '<div class="schoolsItem" data-added-number = ' + (addedNumber += 1) + '><span> ' + selectedSchool + '</span>' +
        '<button onclick="deleteItem(this.parentElement)">Delete Schools</button></div>'
    );

    $('#radarTitle').html('<h2>' + selectedSchool + '</h2>');

    $('.schoolPicture').hide(); //hide all images before showing selected one

    $('#' + schoolID).show();

});
function deleteItem(divElem){
    divElem.parentElement.removeChild(divElem);
}

function goBack() {
    location.href = '../public/landing.html'
}


// this code taken from professor's example
function show(id) {
    $('.tab')//Select all elements with tab class
        .removeClass('selected')//From that set, remove the class "selected" from all
        .filter //Now filter all of the tabs by the function below
        (function () {
            return (this.hash === id);
        }) //From the link that has the same # mark as what was clicked, add the selected tag
        .addClass('selected');

    $('.panel')//Select all elements with panel class
        .hide() //Hide all of them
        .filter(id) //Select just the one with the given id
        .show(); //Unhide it
}

//Set a listener so that when we change the #... part of it, we call the function above
$(window).on('hashchange', function () {
    show(location.hash);
});

// // initialise by showing the first panel
// show('#electrictest');
