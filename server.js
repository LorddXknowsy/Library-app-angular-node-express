// Using App, 'Http' service and 'debug' package
const app = require("./app-back-end/app");
const debug = require("debug")("node-angular");
const http = require("http");

// NormalizePort function from express that ensures us,
// in the port should initially be number or string eather.
const normalizePort = (val) => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};
// Listening the error and catching to it
const onError = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Referencing to the full server and error if it exists.
const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
