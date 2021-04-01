const generateIdPlayer = function() {
    // Return Random number...
    return Math.floor((Math.random() * 1000) + 1); // Random number between 1 and 10000
};

// Function to Add cards of the memory
const addCardsOfTheMemory = function(pictures) {
    pictures.forEach(function (picture) {
        $('#memory-cards').append($('<div class="img-thumbnails"><img src="resources/img/png/' + picture + '.png" /></div>'));
    });
};

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

    // Add memory cards
    addCardsOfTheMemory(response.pictures);
};

// Function callAPI
const callAPI = function(onSuccess) {
    // Fake API
    const response = {
        "gameName": "My Memory",
        "levelGame": "Easy",
        "numbersOfChances": 20,
        "pictures": ['rond','carre','triangle','losange','etoile'],
    };
    // Success response of the fake API
    onSuccess(response);
};

// DOM is load
$(function () {
    // Call API
    callAPI(addDatasInTheDom);
});