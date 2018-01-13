"use strict"

let io = require("socket.io-client");
var socket = io.connect("http://127.0.0.1:1234");
socket.on("connect",()=>console.log("connect"));
// socket.open();
socket.on('disconnect',()=>console.log("disconnect"));

setTimeout(()=>socket.close(),2000);