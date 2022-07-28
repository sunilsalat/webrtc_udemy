require("dotenv").config();
const express = require("express");
const http = require("http");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const twilio = require("twilio");

const app = express();
const port = process.env.PORT || 5000;
const server = http.createServer(app);
app.use(cors());

let connectedUser = [];
let rooms = [{ id: "123", connectedUser: ["alex", "david", "olga"] }];

app.get(`/api/room-exists/:roomId`, async (req, res) => {
  const { roomId } = req.params;

  const room = rooms.find((room) => room.id === roomId);

  if (room) {
    console.log(room);
    if (room?.connectedUser?.length > 3) {
      return res.status(200).json({ roomExists: true, full: true });
    } else {
      return res.status(200).json({ roomExists: true, full: false });
    }
  } else {
    return res.status(200).json({ roomExists: false });
  }
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(port, () => console.log(`server running on ${port}`));
