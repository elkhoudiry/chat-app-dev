import { Socket } from "socket.io";
import logging from "../utils/logging";
import { addClient, getClient, removeClient } from "../utils/active_clients";
import { ActiveClient } from "../models/active_client";

const NAMESPACE = "chat-client";

/** Handle chat client events */
function handleChatClient(socket: Socket, client: ActiveClient) {
  socket.on("join-chat", (callback) => {
    logging.info(
      NAMESPACE,
      `client name: ${client!.name}, email: ${client!.email}, id: ${
        client!.socketId
      }, has joined chat!`
    );

    if (callback) callback();

    socket.emit("chat-message", {
      sender: "admin",
      message: `Welcome ${client!.name}, you have successfully joined chat`,
    });

    socket.broadcast.to(client!.email).emit("chat-message", {
      sender: "admin",
      message: `${client!.name} has joined!`,
    });

    socket.join(client!.email);
  });

  socket.on("send-chat-message", (message, callback) => {
    const client = getClient(socket.id);
    callback();

    socket.broadcast.to(client!.email).emit("chat-message", {
      sender: client?.name,
      message: message,
    });
  });

  socket.on("leave-chat", ({ clientName, clientEmail }) => {
    logging.info(
      NAMESPACE,
      `client name: ${clientName}, email: ${clientEmail}, id: ${socket.id}, has left chat!`
    );
  });

  socket.on("disconnect", () => {
    removeClient(socket.id);
  });
}

export { handleChatClient };
