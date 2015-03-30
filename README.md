
This is a working SSL WEBRTC video chat web app written in node.js


Disclaimer

I adapted code from

https://github.com/felixhagspiel/webrtc-tutorial.git



I used this moduel: "npm install websocket --save"

the first commit is pure webrtc and works by starting two servers thus:

§ cd ..../webrtc/src
§ node ws_server.js
§ node static_server.js


in browser

https://localhost:8888/

tested on chrome

one time allow use of video and audio



planning to integrate this app with the hybrid android app in:

https://github.com/hamshif/Intercom.git