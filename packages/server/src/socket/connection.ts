import { Socket } from "socket.io";
import { addClient } from "../utils/active_clients";
import logging from "../utils/logging";
import { handleChatClient } from "./chat_client_connection";

const NAMESPACE = "connection";

/** Handle initial socket connection events */
function handleConnection(socket: Socket) {
  socket.on("joining-chat", ({ name, email }, callback) => {
    logging.info(
      NAMESPACE,
      `client name: ${name}, email: ${email}, id: ${socket.id}, is joining chat!`
    );

    const { error, client } = addClient(socket.id, name, email);

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
