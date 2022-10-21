let express = require("express");
let app = express();
const socket = require("socket.io");

let server = app.listen(3000);

app.use(express.static("public"));
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});


io.sockets.on(
  "connection",
  function (socket) {
    console.log("We have a new client: " + socket.id);

    socket.on("mouse", function (data) {
      socket.broadcast.emit("mouse", data);

    });

    socket.on("disconnect", function () {
      console.log("Client has disconnected");
    });
  }
);
