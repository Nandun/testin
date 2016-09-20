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