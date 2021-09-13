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
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{name}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                    </div>
                    <p className="sentText pl-10 ">{message.sender}</p>
                </div>
            )
    );
}

export default Message;