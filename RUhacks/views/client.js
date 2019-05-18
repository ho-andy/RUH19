var socket = io();

$('#chat-form').submit(function(e){
    
    alert("submitted");
    var messageContent = $("#message-content").val();
    console.log(messageContent);
    e.preventDefault();
    //return false;
});

