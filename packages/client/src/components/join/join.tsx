import React, { useState, useEffect } from "react"
import { EmailCode } from '../index'
import "./join.css"

const Join = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [showEmailCode, setShowEmailCode] = useState(false)

    useEffect(() => {
        return () => { }
    }, [name, email])

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Contact Ahmed Elkhoudiry</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} value={name} /></div>
                <div><input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => setEmail(event.target.value)} value={email} /></div>
                <button className="button mt-20" type="submit" onClick={() => setShowEmailCode(() => true)}>Send Code</button>
                <EmailCode name={name} email={email} showEmailCode={showEmailCode} setShowEmailCode={setShowEmailCode} />
            </div>
        </div>
    )
}

export default Join
