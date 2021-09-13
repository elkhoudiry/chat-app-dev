import { Socket } from "socket.io";
import { ActiveClient } from "../models/active_client";
import { addClient } from "../utils/active_clients";
import logging from "../utils/logging";
import { handleChatClient } from "./chat_client_connection";

const NAMESPACE = "connection";

/** Handle initial socket connection events */
function handleConnection(socket: Socket) {
  socket.on("joining-chat", ({ name, email, to }, callback) => {
    logging.info(
      NAMESPACE,
      `client name: ${name}, email: ${email}, id: ${socket.id}, is joining chat!`
    );

    let client: ActiveClient | undefined;
    let error: string | undefined;

    if (to && to != email && email !== process.env.AUTHORIZED_EMAIL) {
      error = "You are not authorized"
    } else {
      const response = addClient(socket.id, name, email, to);
      client = response.client;
      error = response.error;
    }

    if (error) {
      if (callback) callback({ error });
      socket.disconnect();
      return;
    }

    handleChatClient(socket, client!);
    callback();
  });

  socket.on("disconnect", () => {
    logging.info(NAMESPACE, `socket id: ${socket.id} closed!`);
  });
}

export default {
  handleConnection: handleConnection,
};
