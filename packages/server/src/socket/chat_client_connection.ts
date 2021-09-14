import { Socket } from "socket.io";
import logging from "../utils/logging";
import { addClient, getClient, removeClient } from "../utils/active_clients";
import { ActiveClient } from "../models/active_client";
import { sendMail } from "../utils/email"

const NAMESPACE = "chat-client";

/** Handle chat client events */
function handleChatClient(socket: Socket, client: ActiveClient) {

  const room = client.to

  socket.on("join-chat", (callback) => {
    logging.info(
      NAMESPACE,
      `client name: ${client!.name}, email: ${client!.email}, id: ${client!.socketId
      }, has joined chat!`
    );

    if (callback) callback();

    sendMail(client.email)

    socket.emit("chat-message", {
      sender: "admin",
      message: `Welcome ${client!.name}, you have successfully joined chat`,
    });

    socket.broadcast.to(room).emit("chat-message", {
      sender: "admin",
      message: `${client!.name} has joined!`,
    });

    socket.join(room);
  });

  socket.on("send-chat-message", (message, callback) => {
    const client = getClient(socket.id);
    callback();

    socket.broadcast.to(room).emit("chat-message", {
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
    socket.broadcast.to(room).emit("chat-message", {
      sender: "admin",
      message: `${client!.name} has left!`,
    });
    removeClient(socket.id);
    socket.disconnect()
  });
}

export { handleChatClient };
