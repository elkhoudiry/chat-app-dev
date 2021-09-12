import {Socket} from 'socket.io'
import logging from '../utils/logging'

const NAMESPACE = "client"

/** Handle initial socket connection event */
function handleConnection(socket: Socket) {
    socket.on("join", ({ clientName, clientEmail }) => {
        logging.info(NAMESPACE, `client name: ${clientName}, email: ${clientEmail}, id: ${socket.id}, has joined!`)
    })

    socket.on("leave", ({ clientName, clientEmail }) => {
        logging.info(NAMESPACE, `client name: ${clientName}, email: ${clientEmail}, id: ${socket.id}, has left!`)
    })

    socket.on("disconnect", () => {
        logging.info(NAMESPACE, `socket id: ${socket.id} closed!`)
  })
}

export default {
    handleConnection: handleConnection
}