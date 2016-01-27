$(document).ready(function() {
    $('#myModal').on('hidden.bs.modal', function () {
        fadeInWelcome();
    });

    $('#myModal').modal('show');
    var connection = sockets();
    handleModal();
    handleMessaging(connection);
});

function setUserName() {
    var username = $('#nickname').val() || undefined;
    if (username != undefined) {
        $('#username').text(username);
    }
}

function fadeInWelcome() {
    $('#welcome').addClass('in');
}

function handleMessaging(conn) {
    $('#send').on('click', function (e) {
        e.preventDefault();
        var msg = $('#message').val() || undefined;
        if (msg != undefined) {
            var fullMessage = $('#username').text() + ": " +  msg;
            send(conn, fullMessage);
            $('#message').val("");
        }

    });

    $('#messageForm').on('keypress', function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            $('#send').trigger('click');
        }
    });
}

function handleModal() {
    $('#mySubmitForm').on('click', function (e) {
        $('#myModal').modal('hide');
        setUserName();
    });

    $('#myModal').on('keypress', function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            $('#mySubmitForm').trigger('click');
        }
    });
}

function sockets() {
    var conn = new WebSocket('ws://localhost:8080');
    conn.onopen = function (e) {
        console.log("Connection established!");
    };

    conn.onmessage = function (e) {
        $("#myScrollArea").append("<p>" + e.data + "</p>");
    };

    return conn;
}

function send(conn, msg) {
    conn.send(msg);
}