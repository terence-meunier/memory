const generateIdPlayer = function() {
    // Return Random number...
    return Math.floor((Math.random() * 1000) + 1); // Random number between 1 and 10000
};

// Function to Add cards of the memory
const addCardsOfTheMemory = function(pictures) {
    
}

// Function to Add response data API in the DOM
const addDatasInTheDom = function (response) {
    // Show title game
    $('header').append($('<h2>' + response.gameName + '</h2>'));

    // Show the level game
    $('header').append($('<h3>Game level : ' + response.levelGame + '</h3>'));

    // Show the id player
    $('header').append($('<h4>ID Player : #' + generateIdPlayer() + '</h4>'));

    // Show number of chances
    $('header').append($('<h5>Numbers of chances : ' + response.numbersOfChances + ' Chances</h5>'));
};

// Function callAPI
const callAPI = function(onSuccess) {
    $.ajax({
        url: "https://api.mocki.io/v1/61a5978d",
        method: "GET",
        dataType: "json",
    })
    .done(response => onSuccess(response)); // Console log API Response
};

// DOM is load
$(function () {
    // Call API
    callAPI(response => response.forEach(addDatasInTheDom));
});