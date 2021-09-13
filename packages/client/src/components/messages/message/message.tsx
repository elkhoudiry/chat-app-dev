import React from 'react';

import './message.css';

// @ts-expect-error
import ReactEmoji from 'react-emoji';
import { ChatMessage } from '../../../models/chat_message';

const Message = ({ message, name }: { message: ChatMessage, name: string }) => {
    let isSentByCurrentUser = false;

    if (message.sender === name) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer">
                    <p className="sentText">{name}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer">
                    <p className="sentText">{message.sender}</p>
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                    </div>
                </div>
            )
    );
}

export default Message;