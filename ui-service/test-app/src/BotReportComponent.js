import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscribeToPubSub = async () => {
      const response = await fetch('/msgs');
      const data = await response.json();
      const receivedMessages = data.messages;
      setMessages((prevMessages) => [...prevMessages, ...receivedMessages]);
    };

    const eventSource = new EventSource('/subscribe');
    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    subscribeToPubSub();

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Mensajes Recibidos en Tiempo Real</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;