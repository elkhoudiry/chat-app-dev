import React from 'react';

// @ts-expect-error
import ScrollToBottom from 'react-scroll-to-bottom';
import { ChatMessage } from '../../models/chat_message';

import Message from './message/message';

import './messages.css';

const Messages = ({ messages, name }: { messages: Array<ChatMessage>, name: string }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
    </ScrollToBottom>
);

export default Messages;