$(function() {
    //var socket = io('https://certain-voyager-241002.appspot.com', { transports: [ 'websocket', 'polling' ] });
    var socket = io();
    var currTime;

    $('button').on('click', function(e){

        var date = new Date();
        var minutes = date.getMinutes();
        //console.log(minutes.toString().trim().length);
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
        console.log("myown Message: " + msg);
        var history = $('#chat-history').val();

        var tempTime = "";
        if(currTime === undefined){
            var date = new Date();
            tempTime = date.getHours() + ":" + date.getMinutes();

            var out = history + '\n' + tempTime + " " + msg;
            var out2 = tempTime + " " + msg;
            console.log("tempTime: " + tempTime);
    
            if(history){
                console.log("Out: " + out);
                $('#chat-history').val(out);
                addToTextarea($('#chat-history'));
            } else {
                console.log("Out2: " + out2);
                $('#chat-history').val(out2);
                addToTextarea($('#chat-history'));
            }
        } else {
            var out = history + '\n' + currTime + " " + msg;
            var out2 = currTime + " " + msg;
            console.log("currTime2: " + currTime);
    
            if(history){
                console.log("Out: " + out);
                $('#chat-history').val(out);
                addToTextarea($('#chat-history'));
            } else {
                console.log("Out2: " + out2);
                $('#chat-history').val(out2);
                addToTextarea($('#chat-history'));
            }
        } 
    });

    function addToTextarea($ta) {
        $ta.scrollTop($ta[0].scrollHeight);
    }
        

});

