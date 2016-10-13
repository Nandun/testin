"use strict";

function deleteItem() {
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
