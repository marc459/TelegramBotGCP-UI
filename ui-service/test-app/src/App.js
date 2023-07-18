import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
//   const socket = new WebSocket('ws://bot-service-36gz5wrlea-ue.a.run.app');

//   useEffect(() => {
//     socket.onopen = () => {
//       console.log('WebSocket connected');
//     };

//     socket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       setMessages((prevMessages) => [...prevMessages, message]);
//     };

//     return () => {
//       socket.close();
//       console.log('WebSocket disconnected');
//     };
//   }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const message = { text: inputMessage };
    //   socket.send(JSON.stringify(message));
      setInputMessage('');
    }
  };

  return (
    <div className="chat-container">
      <h1 className="chat-header">WebSocket Chat</h1>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">{message.text}</div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;