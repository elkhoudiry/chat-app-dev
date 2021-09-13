import React, { useState, useEffect, SyntheticEvent } from "react"
import { Location } from "history"
import queryString from "query-string"
import io, { Socket } from "socket.io-client"
import dotenv from "dotenv"
import { ChatMessage } from "../../models/chat_message"

import "./chat.css"

import { Infobar, Input, Messages } from '../index'

dotenv.config()

let socket: Socket;

const Chat = ({ location }: { location: Location }) => {

    const [clientName, setClientName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState<Array<ChatMessage>>([])
    const ENDPOINT = `https://elkhoudiry-chat-app.herokuapp.com/`

    useEffect(() => {
        const { name, email } = queryString.parse(location.search)

        if (!name || !email) return

        setClientName(Array.isArray(name) ? name[0] : name)
        setClientEmail(Array.isArray(email) ? email[0] : email)

        if (!clientName || !clientEmail) return

        socket = io(ENDPOINT)
        socket.emit("joining-chat", { clientName, clientEmail }, ({ error }: { error: string | undefined | null } = { error: null }) => {
            // TODO handle this error

            if (error) {
                alert(error)
                disconnectConnection()
                return
            }

            socket.emit("join-chat", () => {
                setMessages([])
            })
        })

        return () => {
            disconnectConnection()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ENDPOINT, clientEmail, clientName, location.search])

    useEffect(() => {
        if (!socket) return

        socket.on("chat-message", (message: ChatMessage) => {
            setMessages([...messages, message])
        })
    }, [messages])

    const sendMessage = (event: SyntheticEvent) => {
        event.preventDefault()
        if (message) {
            socket.emit("send-chat-message", message, () => {
                setMessages([...messages, { sender: clientName, message: message }])
                setMessage("")
            })
        }
    }

    const disconnectConnection = () => {
        if (socket && socket.connected) {
            socket.emit("leave-chat", { clientName, clientEmail })
            socket.disconnect()
            socket.off()
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar />
                <Messages messages={messages} name={clientName} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat
