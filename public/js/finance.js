$(document).ready(function() {
    var BASE_URL = window.location.origin;
    getSP500Up();

    function getSP500Up() {
        $.get(BASE_URL + '/api/v1/sp500Up', function(data) {
            console.log(data);
        });
    }
});
