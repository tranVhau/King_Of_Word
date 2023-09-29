// import express, { Express, Request, Response, Application } from "express";
// import "./src/configs/database";
// import cookieSession from "cookie-session";
// import dotenv from "dotenv";
// import routes from "./src/routes";
// import passport from "passport";
// import "./src/services/passport";
// import cors from "cors";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import bodyParser from "body-parser";

// import connectionHandler from "./src/socket/connection.socket";
// import gameHandler from "./src/socket/game.socket";

// dotenv.config();
// const app = express();

// app.use(
//   cors({
//     origin: [
//       process.env.CLIENT_URL,
//       process.env.SERVER_URL,
//       "https://api-m.sandbox.paypal.com",
//     ],
//     credentials: true,
//   })
// );
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["KNGofWRD"],
//     maxAge: 5 * 60 * 60 * 1000,
//   })
// );

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(passport.initialize());
// app.use(passport.session());

// routes(app);
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
//   cors: {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//   },
// });

// interface playerInfo {
//   socketID?: string;
//   playerID?: string;
//   name?: string;
//   photo?: string;
//   ready: boolean;
//   scoreRecord?: [];
//   score?: number;
//   isJoined: boolean;
// }
// interface roomInfo {
//   isFull?: boolean;
//   inMatch: boolean;
//   players?: playerInfo[];
// }
// const rooms: roomInfo[] = [];

// io.on("connection", (socket) => {
//   connectionHandler(io, socket, rooms);
//   gameHandler(io, socket, rooms);
// });

// const port: string = process.env.PORT;
// httpServer.listen(port, () => {
//   console.log(`app is running at http://localhost:${port}`);
// });

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
const bodyParser = require("body-parser");

const connectionHandler = require("./src/socket/connection.socket");
const gameHandler = require("./src/socket/game.socket");

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.SERVER_URL,
      "https://api-m.sandbox.paypal.com",
    ],
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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

routes(app);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
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
