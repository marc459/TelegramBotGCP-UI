const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const TelegramBot = require('node-telegram-bot-api');
// const WebSocket = require('ws');
// const cors = require('cors');

// app.use(cors());


const token = '6301757870:AAG_QI3O97sNaW3q8jsX4YLBq_7dMrbdb4o';
const bot = new TelegramBot(token, { polling: true });


// Function to send a message to all connected clients
function sendToClients(message) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

app.post('/', async (req, res) => {
  try {
    const labReport = req.body;
    await publishPubSubMessage(labReport);
    sendToClients(labReport)
    res.status(204).send();
  }
  catch (ex) {
    console.log(ex);
    res.status(500).send(ex);
  }
})

app.get('/', async (req, res) => {
  res.send("Bot enabled")
})

// Ruta para recibir los mensajes de Telegram
const enableBot = ()=>
{
  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    
    console.log(`Mensaje recibido: ${message}`);
    // publishPubSubMessage(message);
    bot.sendMessage(chatId, '¡Hola! He recibido tu mensaje.');
    return(message);
  });
}

async function publishPubSubMessage(labReport) {
  const buffer = Buffer.from(JSON.stringify(labReport));
  await pubsub.topic('bot-report').publish(buffer);
}

enableBot();


// const wss = new WebSocket.Server({ server });
// // Store connected clients
// const clients = new Set();

// // WebSocket connection handler
// wss.on('connection', (ws) => {
//   // Add new client to the set
//   clients.add(ws);

//   // Handle incoming messages
//   ws.on('message', (message) => {
//     // Broadcast the received message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   // Handle client disconnection
//   ws.on('close', () => {
//     // Remove the client from the set
//     clients.delete(ws);
//   });
// });


const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log('Listening on port', port);
});
