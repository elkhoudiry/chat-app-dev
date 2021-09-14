import { Socket } from "socket.io";
import { addCode, findCode, verifyCode } from "../clients/email-verfication";
import { ActiveClient } from "../models/active_client";
import { addClient } from "../utils/active_clients";
import { sendMail } from "../utils/email";
import logging from "../utils/logging";
import { handleChatClient } from "./chat_client_connection";

const NAMESPACE = "connection";

/** Handle initial socket connection events */
function handleConnection(socket: Socket) {

  socket.on("new-connection", ({ email, name }, callback) => {
    logging.info(NAMESPACE, `${email} is connecting!`)

    const emailCode = findCode(email)

    if (emailCode && emailCode.verified) {
      logging.info(NAMESPACE, `${email} is verified, code is: ${emailCode.code} !`)
      callback({ error: undefined })
    } else {
      const newCode = addCode(email)

      sendMail(email, `Hello ${name}!`, `Here is your verification code: ${newCode}<br>Please use to complete your verification process.`)

      callback({ error: "need to verify email" })
      logging.info(NAMESPACE, `the new generated code for: ${email}, is ${newCode} !`)
    }
  })

  socket.on("verify-code", ({ email, code }, callback) => {
    logging.info(NAMESPACE, `${email} is verifying code`)

    const result = verifyCode(email, code)

    if (result) {
      logging.info(NAMESPACE, `${email} code verifying success!`)
    } else {
      logging.info(NAMESPACE, `${email} code verifying failed!`)
    }

    callback({ success: result })
  })

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
