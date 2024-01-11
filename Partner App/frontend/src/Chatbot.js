import React, { useState } from 'react';
import { LexRuntime } from 'aws-sdk';
import './Chatbot.css';

function ChatbotIcon({ onClick }) {
    return (
        <div className="chatbot-icon" onClick={onClick}>
            <span>💬</span> {/* Replace with your icon */}
        </div>
    );
}

function Chatbot({ isVisible }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const lexRuntime = new LexRuntime({
        region: 'us-east-1', 
        credentials: {
        accessKeyId: '', 
        secretAccessKey: '' 
    }
    });

    const sendMessageToLex = async (message) => {
        const params = {
            botAlias: '', // Replace with your bot alias
            botName: '', // Replace with your bot name
            inputText: message, // A test message
            userId: '', // Use a test user ID
        };

        try {
            const response = await lexRuntime.postText(params).promise();
            setMessages(prevMessages => [...prevMessages, { text: message, sender: 'user' }, { text: response.message, sender: 'bot' }]);
        } catch (error) {
            console.error('Error sending message to Lex:', error);
            setMessages(prevMessages => [...prevMessages, { text: "Sorry, I'm having trouble understanding you.", sender: 'bot' }]);
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        if (input.trim()) {
            sendMessageToLex(input);
            setInput('');
        }
    };

    if (!isVisible) return null;

    return (
        <div className="chat-container">
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

function App() {
    const [isChatVisible, setIsChatVisible] = useState(false);

    const toggleChat = () => setIsChatVisible(!isChatVisible);

    return (
        <div>
            <ChatbotIcon onClick={toggleChat} />
            <Chatbot isVisible={isChatVisible} />
        </div>
    );
}

export default App;
