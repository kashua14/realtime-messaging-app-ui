var app = require("express")();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require("socket.io")(http);

app.use(require("express").static('data'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


// This is auto initiated event when Client connects to Your Machien.  
io.on('connection', function (socket) {
    socket.on('get msg', function (data) {
        var data_client = data;
        // console.log($scope.name);
        // if($scope.name==data){

        // }
        io.emit('set msg', JSON.stringify(data_client));
    });
});


http.listen(3001, function () {
    console.log("Listening on 3001");
});
