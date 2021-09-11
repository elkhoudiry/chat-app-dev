import express from "express";
import logging from "./utils/logging";
import config from "./utils/config";
import pingRoutes from "./routes/ping";

const NAMESPACE = "server";
const app = express();

/** Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/** Logging requests */
app.use((req, res, next) => {
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
app.use((req, res, next) => {
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

/** Routes */
app.use("/", pingRoutes);

/** Errors handle */
app.use((req, res, next) => {
  const err = new Error("oh not found!");

  return res.status(404).json(err.message);
});

/** Start Server */
app.listen(config.server.port, () =>
  logging.info(
    NAMESPACE,
    `Server started on ${config.server.hostname}:${config.server.port}`
  )
);
