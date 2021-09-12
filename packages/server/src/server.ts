import http from "http";
import express from "express";
import { Server } from "socket.io";
import logging from "./utils/logging";
import config from "./utils/config";
import apiRoutes from "./routes/api";
import client from "./socket/client";
import path from "path";

const NAMESPACE = "server";

const router = express();
const server = http.createServer(router);
const io = new Server(server);

/** Parse the request */
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use(express.static(path.join(__dirname, "../../client/build")));

/** Logging requests */
router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log response */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

/** Rules */
router.use((req, res, next) => {
  // TODO remove in production with predefined routes & origins
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
    return res.status(200).json({});
  }

  next();
});

/** Socket.IO Handler */
io.on('connection', (socket) => {
  logging.info(NAMESPACE, 'new socket connection!')

  client.handleClient(socket)
})

/** Routes */
router.use("/api", apiRoutes);

router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../client/build/index.html"));
});

/** Errors handle */
router.use((req, res, next) => {
  const err = new Error("oh not found!");

  return res.status(404).json(err.message);
});

/** Start Server */
server.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server started on ${config.server.hostname}:${config.server.port}`
  )
);
