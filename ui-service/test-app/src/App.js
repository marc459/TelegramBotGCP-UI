import React, { useEffect, useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Establece la conexión WebSocket
    const socket = new WebSocket('ws://bot-service-36gz5wrlea-ue.a.run.app:8080/ws');

    // Maneja los mensajes recibidos desde el servidor
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    // Cierra la conexión WebSocket al desmontar el componente
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h1>Mensajes recibidos:</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;