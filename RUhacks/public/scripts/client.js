$(function() {
    var socket = io();

    $('button').on('click', function(e){

        var messageContent = $("#message-content").val();
        console.log(messageContent);
        socket.emit('user-message', messageContent);
        //e.preventDefault();
        return false;
    });

    socket.on('user-message', function(msg){
        console.log("myown");
        console.log("Message: " + msg);
        $('#chat-history').val($('#chat-history').val() + '\n' + msg);
    });

});

