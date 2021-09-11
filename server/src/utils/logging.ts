const getTimestamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: String, message: String, object?: any) => {
  console.info(
    `[${getTimestamp()}] [INFO] [${namespace}] ${message}`,
    object ? object : ""
  );
};

const warn = (namespace: String, message: String, object?: any) => {
  console.warn(
    `[${getTimestamp()}] [WARN] [${namespace}] ${message}`,
    object ? object : ""
  );
};

const error = (namespace: String, message: String, object?: any) => {
  console.error(
    `[${getTimestamp()}] [ERROR] [${namespace}] ${message}`,
    object ? object : ""
  );
};

const debug = (namespace: String, message: String, object?: any) => {
  console.debug(
    `[${getTimestamp()}] [DEBUG] [${namespace}] ${message}`,
    object ? object : ""
  );
};

export default {
  info,
  warn,
  error,
  debug,
};
