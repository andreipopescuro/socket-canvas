let express = require("express");
// Create the app
let app = express();
const socket = require("socket.io");
// Set up the server
// process.env.PORT is related to deploying on heroku
let server = app.listen(3000);

app.use(express.static("public"));
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// WebSocket Portion
// WebSockets work with the HTTP server

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on(
  "connection",
  // We are given a websocket object in our function
  function (socket) {
    console.log("We have a new client: " + socket.id);

    // When this user emits, client side: socket.emit('otherevent',some data);
    socket.on("mouse", function (data) {
      // Send it to all other clients
      socket.broadcast.emit("mouse", data);

      // io.sockets.emit('message', "this goes to everyone");
    });

    socket.on("disconnect", function () {
      console.log("Client has disconnected");
    });
  }
);
