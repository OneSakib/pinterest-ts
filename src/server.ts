#!/usr/bin/env node

/**
 * Module dependencies.
 */
import "./preServer";
import app from "./app";
import { debug } from "debug";
import { createServer } from "http";
import db_connection from "./database/connection";
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

/**
 * Create HTTP server.
 */

var server = createServer(app);

/**
 * Connection to server.
 */
db_connection
  .then((conection) => {
    console.log("Database connected successfully");
    /**
     * Listen on provided port, on all network interfaces.
     */

    server.listen(port, () => {
      console.log("Server is running on port : ", port);
      console.log("Server URL : http://localhost:" + port);
    });
    server.on("error", onError);
    server.on("listening", onListening);
  })
  .catch((error) => {
    console.error.bind(console, "Datavse connection error:");
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
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
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
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
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  if (addr) {
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }
}
