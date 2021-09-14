import React, { useState } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom'

import "./email-code.css"

Modal.setAppElement("#root")

const EmailCode = ({ name, email, showEmailCode, setShowEmailCode }: { name: string, email: string, showEmailCode: boolean, setShowEmailCode: Function }) => {

    const [emailCode, setEmailCode] = useState("")

    return (
        <Modal isOpen={showEmailCode} className="emailCardModalContentStyle" overlayClassName="emailCardModalOverlayStyle">
            <div className="emailCodeOuterContainer">
                <div className="emailCodeInnerContainer">
                    <h1 className="heading">Email Code Verfication</h1>
                    <p className="emailCodeBodyParagraph">An Email Message Has Been Sent to {email} With a Verfication Code, Enter the code that is sent to your email</p>
                    <p className="emailCodeBodyParagraph">Remember to check your junk or spam folders</p>
                    <div><input placeholder="Code" className="joinInput" type="text" onChange={(event) => setEmailCode(event.target.value)} value={emailCode} /></div>
                    <Link onClick={event => (!name || !email) ? event.preventDefault() : null} to={`/chat?name=${name}&email=${email}`}>
                        <button className="button mt-20" type="submit">Join</button>
                    </Link>
                </div>
            </div>
        </Modal>
    )
}

export default EmailCode
