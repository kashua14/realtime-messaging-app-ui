var socket = io.connect('http://localhost:4008');

var feedback = document.getElementById('feedback'),
    message = document.getElementById('message'),
    data = 'someone';
console.log('am in chat.js');
message.addEventListener('keypress', function(){
    socket.emit('typing', data);
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + 'is typing...</em><p>';
})