import React, { useState, useEffect } from "react"
import { Location } from "history"
import queryString from "query-string"
import io, { Socket } from "socket.io-client"
import dotenv from "dotenv"

import "./chat.css"

dotenv.config()

let socket: Socket;

const Chat = ({ location }: { location: Location }) => {

    const [clientName, setClientName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const ENDPOINT = process.env.REACT_APP_ENDPOINT || `localhost:${process.env.PORT}`

    useEffect(() => {
        const { name, email } = queryString.parse(location.search)

        if (!name || !email) return

        setClientName(Array.isArray(name) ? name[0] : name)
        setClientEmail(Array.isArray(email) ? email[0] : email)

        if (!clientName || !clientEmail) return

        socket = io(ENDPOINT)
        socket.emit('join', { clientName, clientEmail })

        return () => {
            if (socket && socket.connected) {
                socket.emit("leave", { clientName, clientEmail })
                socket.disconnect()
                socket.off()
            }
        }
    }, [ENDPOINT, clientEmail, clientName, location.search])

    return (
        <h1>Chat !</h1>
    )
}

export default Chat
