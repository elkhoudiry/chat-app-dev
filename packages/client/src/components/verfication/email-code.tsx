import React, { useState } from 'react'
import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import { Socket } from 'socket.io-client'

import "./email-code.css"

Modal.setAppElement("#root")

const EmailCode = ({ socket, name, email, showEmailCode, setShowEmailCode }: { socket: Socket, name: string, email: string, showEmailCode: boolean, setShowEmailCode: Function }) => {

    const [code, setEmailCode] = useState("")
    const history = useHistory()
    const verifyCode = () => {
        socket.emit("verify-code", ({ email, code }), ({ success }: { success: boolean }) => {
            if (success) {
                setShowEmailCode(() => false)
                history.push(`/chat?name=${name}&email=${email}`)
            } else {
                alert("failed to verify")
            }
        })
    }

    return (
        <Modal isOpen={showEmailCode} className="emailCardModalContentStyle" overlayClassName="emailCardModalOverlayStyle">
            <div className="emailCodeOuterContainer">
                <div className="emailCodeInnerContainer">
                    <h1 className="heading">Email Code Verfication</h1>
                    <p className="emailCodeBodyParagraph">An Email Message Has Been Sent to {email} With a Verfication Code, Enter the code that is sent to your email</p>
                    <p className="emailCodeBodyParagraph">Remember to check your junk or spam folders</p>
                    <div><input placeholder="Code" className="joinInput" type="text" onChange={(event) => setEmailCode(event.target.value)} value={code} /></div>
                    <button onClick={event => (!code || code.length !== 10) ? event.preventDefault() : verifyCode()} className="button mt-20" type="submit">Join</button>
                </div>
            </div>
        </Modal>
    )
}

export default EmailCode
