import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { EmailCode } from '../index'
import io, { Socket } from 'socket.io-client'
import "./join.css"

const ENDPOINT = process.env.REACT_APP_ENDPOINT ?? "localhost:5430"
let socket: Socket;

const Join = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [showEmailCode, setShowEmailCode] = useState(false)
    const history = useHistory()

    useEffect(() => {
        socket = io(ENDPOINT)

        return () => {
            socket.disconnect()
        }
    }, [])

    const newConnection = () => {
        socket.emit("new-connection", ({ email, name }), ({ error }: { error: string | undefined }) => {
            if (error && error === "need to verify email") {
                setShowEmailCode(() => true)
            } else {
                history.push(`/chat?name=${name}&email=${email}`)
            }
        })
    }

    const validateEmail = (email: string) => {
        var mailformat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
        if (email.match(mailformat)) {
            newConnection()
        }
        else {
            alert("You have entered an invalid email address!");
        }
    }

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Contact Ahmed Elkhoudiry</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} value={name} /></div>
                <div><input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => setEmail(event.target.value)} value={email} /></div>
                <button className="button mt-20" type="submit" onClick={event => (!name || !email) ? event.preventDefault() : validateEmail(email)}>Send Code</button>
                <EmailCode socket={socket} name={name} email={email} showEmailCode={showEmailCode} setShowEmailCode={setShowEmailCode} />
            </div>
        </div>
    )
}

export default Join
