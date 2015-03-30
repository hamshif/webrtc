/**
 * Created by gideonbar on 31/03/15.
 */

var req = new XMLHttpRequest();
req.open('GET', document.location, false);
req.send(null);
var headers = req.getAllResponseHeaders().toLowerCase();
console.log('headers:');
console.log(headers);

var url_type = "ws";

if(req.getResponseHeader('ssl') == "true")
{
    url_type = "wss";
}

/*
*	Get DOM-Elements
*/
var roomidInput = document.getElementById('roomidInput');
var createRoom = document.getElementById('createRoom');
var joinRoom = document.getElementById('joinRoom');
var login = document.getElementById('login');
var roomId = document.getElementById('roomId');
var room = document.getElementById('room');
var ownVideo = document.getElementById('ownVideo');
var otherVideo = document.getElementById('otherVideo');
/*
*	Create some Helper-Functions
*/
var hasClass  = function(el,className) {
    if(!el || !className){return;}
    return (new RegExp("(^|\\s)" + className + "(\\s|$)").test(el.className));
};
var removeClass = function(el,className) {
    if(!el || !className){return;}
    el.className = el.className.replace(new RegExp('(?:^|\\s)'+className+'(?!\\S)'),'' );
    return el;
};
var addClass = function(el,className) {
    if(!el || !className){return;}
    if(!hasClass(el,className)) { el.className += ' '+className; }
    return el;
};
/*
*	Open Websocket-Connection
*/
// create new WebRTC-Object
var WebRTC = new WebRTC();
// connect to websocket server
WebRTC.connectToSocket(url_type + '://iwet-12.cs.huji.ac.il:63949');
/*
*	Add Click-Handler and Event-Listener
*/
// add a eventlister when the server has answered
document.addEventListener('socketEvent', function(socketEvent){
    switch(socketEvent.eventType) {
        case 'roomCreated':
            // hide login and show room
            removeClass(login,'active');
            addClass(room,'active');
            // display the room-ID
            roomId.innerHTML = WebRTC.getRoomId();
        break;
        case 'p2pConnectionReady':
            // hide login and show room
            removeClass(login,'active');
            addClass(room,'active');
            // display the room-ID
            roomId.innerHTML = WebRTC.getRoomId();
        break;
        case 'streamAdded':
            // we receive the video-stream of our partner
            // and play it on the video-element
            otherVideo.src = URL.createObjectURL(WebRTC.getOtherStream());
        break;
    }
});
// create a new room
createRoom.addEventListener('click',function(e){
    e.preventDefault();
    // get media-stream
    var success = function(myStream){
        ownVideo.src = URL.createObjectURL(myStream);
        // create a room
        WebRTC.createRoom();
    };
    WebRTC.getMedia({audio: true, video: true},success);
});
// join room
joinRoom.addEventListener('click',function(e){
    e.preventDefault();
    if(!roomidInput.value) {
        console.log('Please set a room-ID before joining a room!');
        return;
    }
    // get media-stream
    var success = function(myStream){
        // set videostream on ownVideo-object
        ownVideo.src = URL.createObjectURL(myStream);
        // join a room
        WebRTC.joinRoom(roomidInput.value);
    };
    WebRTC.getMedia({audio: true, video: true},success);
});