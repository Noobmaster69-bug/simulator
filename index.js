const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost");


const express = require("express");
const { createServer } = require("http");
const app = express();
const httpServer = createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    methods: ["GET", "POST"],
    credentials: true,
  },
});
httpServer.listen(4001);


io.on("connection", (client) => {
  client.on("hi",() =>{
    console.log("hi")
  })
});

client.on("connect", () => {
  console.log("connected");
  client.subscribe("telemetry", (err, granted) =>{
    if (err) throw err
    console.log("subscribed to telemetry")
  })
});
client.on("message", (topic,message,packet) =>{
  const data = JSON.parse(message.toString())
  io.emit("data",data)
})
