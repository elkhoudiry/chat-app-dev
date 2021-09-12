import {Socket} from 'socket.io'
import logging from '../utils/logging'

const NAMESPACE = "client"

function handleClient(socket: Socket) {

    socket.on("join", ({ clientName, clientEmail }) => {
        
        logging.info(NAMESPACE, `client ${clientName} - ${clientEmail} has joined!`)

    })

    socket.on("disconnect", () => {
        logging.info(NAMESPACE, `socket closed!`)
  })
}

export default {
    handleClient
}