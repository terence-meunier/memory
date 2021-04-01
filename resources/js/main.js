// DOM is load
$(function () {
    // Call API
    $.ajax({
        url: "https://api.mocki.io/v1/61a5978d",
        method: "GET",
        dataType: "json",
    })
    .done(response => console.log(response)); // Console log API Response
});