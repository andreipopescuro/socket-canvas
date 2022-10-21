let socket;
function mouseDragged() {
  fill(133);
  noStroke();
  ellipse(mouseX, mouseY, 10, 10);
  sendmouse(mouseX, mouseY);
}

function sendmouse(xpos, ypos) {
  let data = {
    x: xpos,
    y: ypos,
  };

  socket.emit("mouse", data);
}

function setup() {
  createCanvas(400, 400);
  background(0);
  socket = io.connect("http://localhost:3000", { withCredentials: true });
  socket.on("mouse", function (data) {
    fill(100, 100, 142);
    noStroke();
    ellipse(data.x, data.y, 20, 20);
  });
}

function draw() {
  //   noStroke();
  //   fill(198);
  //   ellipse(mouseX, mouseY, 50, 50);
  // Nothing
}
