"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimestamp = () => {
    return new Date().toISOString();
};
const info = (namespace, message, object) => {
    console.info(`[${getTimestamp()}] [INFO] [${namespace}] ${message}`, object ? object : "");
};
const warn = (namespace, message, object) => {
    console.warn(`[${getTimestamp()}] [WARN] [${namespace}] ${message}`, object ? object : "");
};
const error = (namespace, message, object) => {
    console.error(`[${getTimestamp()}] [ERROR] [${namespace}] ${message}`, object ? object : "");
};
const debug = (namespace, message, object) => {
    console.debug(`[${getTimestamp()}] [DEBUG] [${namespace}] ${message}`, object ? object : "");
};
exports.default = {
    info,
    warn,
    error,
    debug,
};
