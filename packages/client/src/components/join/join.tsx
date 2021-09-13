import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import "./join.css"

const Join = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        return () => { }
    }, [name, email])

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Contact Ahmed Elkhoudiry</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} value={name} /></div>
                <div><input placeholder="Email" className="joinInput mt-20" type="text" onChange={(event) => setEmail(event.target.value)} value={email} /></div>
                <Link onClick={event => (!name || !email) ? event.preventDefault() : null} to={`/chat?name=${name}&email=${email}`}>
                    <button className="button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join
