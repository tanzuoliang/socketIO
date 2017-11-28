"use strict"
// let io = require("socket.io")(1234);
let io = require("socket.io")(1234,{
	pingInterval: 10000,
  	pingTimeout: 5000,
});
let socketMap = new Map();
io.on('connection',(socket)=>{
	console.log(socket.id);
	console.log("client connected! %j:%j", socket.conn.remoteAddress, socket.conn.remotePort);

	broadMessage(socket.id + " entry into romm");
	socketMap.set(socket.id,socket);
	socket.on('disconnect',()=>{
		console.log("socket disconnect");
		socketMap.delete(socket.id);
		broadMessage(socket.id + " remove room");
	});

	socket.on('message',(msg)=>{
			console.log("get message " + msg);
			broadMessage(msg);
	});
});

function broadMessage(msg){
	for(let [_,socket] of socketMap){
		socket.emit("message",msg);
		 console.log("broadMessage " + msg + " to client " + socket.id);
	}
}
