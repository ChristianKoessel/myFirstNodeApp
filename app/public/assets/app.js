var ajaxSetup = {
    // accepts: 'application/json',
    // contentType: 'application/json; charset=UTF-8',
    dataType: 'json',
    method: 'GET'
};

var getWeight = function() {
    ajaxSetup.url = 'http://localhost:8080/api/weight/';
    $.ajax(ajaxSetup)
        .fail(function (response) {
            console.log(response);
        })
        .done(function(response) {
            for (i = 0; i < response.values.length; i++) {
                var date = new Date(response.values[i].date);
                $('.weight-table').append('<tr><td>' + date.toLocaleDateString() + '</td><td>' + response.values[i].weight + '</td></tr>');
                $('#actual-weight').attr('value', response.values[i].weight);
            }
        })
        .always(function(response) {
            console.log(response);
        })
    ;
};

$('document').ready(function() {
    var date = new Date().toISOString().substr(0, 10);
    $('#date').attr('value', date);
    getWeight();
})