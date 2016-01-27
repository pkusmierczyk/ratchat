$(document).ready(function() {

    handleHiddenModal();
    showMyModal();
    var connection = sockets();
    handleModal();
    handleMessaging(connection);
});

function handleHiddenModal() {
    $('#myModal').on('hidden.bs.modal', function () {
        fadeInWelcome();
    });
}

function showMyModal() {
    $('#myModal').modal('show');
}

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
    escapeEnter('#messageForm', '#send');
}

function handleModal() {
    $('#mySubmitForm').on('click', function (e) {
        $('#myModal').modal('hide');
        setUserName();
    });
    escapeEnter('#myModal', '#mySubmitForm')
}

function escapeEnter(selector, triggerSelector) {
    $('#myModal').on('keypress', function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            $(triggerSelector).trigger('click');
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