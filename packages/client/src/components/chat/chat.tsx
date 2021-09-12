import React, { useState, useEffect } from "react"
import { Location } from "history"
import queryString from "query-string"
import io, { Socket } from "socket.io-client"
import dotenv from "dotenv"

import "./chat.css"

dotenv.config()

let socket: Socket;

const Chat = ({ location }: { location: Location }) => {

    const [clientName, setName] = useState("")
    const [clientEmail, setEmail] = useState("")
    const ENDPOINT = process.env.REACT_APP_ENDPOINT || ""

    useEffect(() => {
        const { name, email } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        name && setName(Array.isArray(name) ? name[0] : name)
        email && setEmail(Array.isArray(email) ? email[0] : email)

        socket.emit('join', { clientName, clientEmail })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ENDPOINT, location.search])

    return (
        <h1>Chat !</h1>
    )
}

export default Chat
