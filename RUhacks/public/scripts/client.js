$(function() {
    //var socket = io('https://certain-voyager-241002.appspot.com', { transports: [ 'websocket', 'polling' ] });
    var socket = io();
    var currTime;

    $('button').on('click', function(e){

        var date = new Date();
        var minutes = date.getMinutes();
        console.log(minutes.toString().trim().length);
        if(minutes.toString().length == 1){
            minutes = 0 + "" + minutes;
        }
        currTime = date.getHours() + ":" + minutes;

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
            $('#chat-history').val(temp + '\n' + currTime + " " + msg);
            addToTextarea($('#chat-history'));
        } else {
            $('#chat-history').val(currTime + " " + msg);
            addToTextarea($('#chat-history'));
        }

        
    });

    function addToTextarea($ta) {
        $ta.scrollTop($ta[0].scrollHeight);
    }
        

});

