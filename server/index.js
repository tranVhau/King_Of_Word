const express = require("express");
const database = require("./src/configs/database");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv").config();
const routes = require("./src/routes");
const passport = require("passport");
require("./src/services/passport");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const connectionHandler = require("./src/socket/connection.socket");
const gameHandler = require("./src/socket/game.socket");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:8000"],
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: ["KNGofWRD"],
    maxAge: 5 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

routes(app);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const rooms = [];

io.on("connection", (socket) => {
  connectionHandler(io, socket, rooms);
  gameHandler(io, socket, rooms);
});

const port = process.env.PORT;
httpServer.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});
