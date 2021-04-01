// Function to Add response data API in the DOM
const addDatasInTheDom = function (response) {
    // Show title game
    $('header').append($('<h2>' + response.gameName + '</h2>'));

    // Show the level game
    $('header').append($('<h3>Game level : ' + response.levelGame + '</h3>'));
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