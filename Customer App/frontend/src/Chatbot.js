import React, { useState } from 'react';
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

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Add backend interaction logic here
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
