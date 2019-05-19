$(function() {
    var socket = io();

    $('button').on('click', function(e){
        
        var messageContent = $("#message-content").val().trim();
        console.log(messageContent);
        socket.emit('user-message', messageContent);
        $('#message-content').val("");
        
        

        return false;
    });

    

    socket.on('user-message', function(msg){
        console.log("myown");
        console.log("Message: " + msg);
        var temp = $('#chat-history').val();

        if(temp){
            $('#chat-history').val(temp + '\n' + msg);
            addToTextarea($('#chat-history'));
        } else {
            $('#chat-history').val(msg);
            addToTextarea($('#chat-history'));
        }

        
    });

    function addToTextarea($ta) {
        $ta.scrollTop($ta[0].scrollHeight);
    }
        

});

