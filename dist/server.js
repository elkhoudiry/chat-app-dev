"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logging_1 = __importDefault(require("./utils/logging"));
const config_1 = __importDefault(require("./utils/config"));
const ping_1 = __importDefault(require("./routes/ping"));
const NAMESPACE = "server";
const app = (0, express_1.default)();
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
/** Logging requests */
app.use((req, res, next) => {
    logging_1.default.info(NAMESPACE, `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        /** Log response */
        logging_1.default.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});
/** Rules */
app.use((req, res, next) => {
    // TODO remove in production with predefined routes & origins
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT");
        return res.status(200).json({});
    }
    next();
});
/** Routes */
app.use("/", ping_1.default);
/** Errors handle */
app.use((req, res, next) => {
    const err = new Error("oh not found!");
    return res.status(404).json(err.message);
});
/** Start Server */
app.listen(config_1.default.server.port, () => logging_1.default.info(NAMESPACE, `Server started on ${config_1.default.server.hostname}:${config_1.default.server.port}`));
