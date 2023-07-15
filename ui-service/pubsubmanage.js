const { PubSub } = require('@google-cloud/pubsub');

const projectId = 'telegramgcpdev';
const subscriptionName = 'ui-service-sub';

const pubsub = new PubSub({ projectId });
const subscription = pubsub.subscription(subscriptionName);

// Procesa los mensajes recibidos
function procesarMensaje(mensaje) {
  const listItem = document.createElement('li');
  listItem.textContent = mensaje;
  messageList.appendChild(listItem);
}

// Escucha los mensajes recibidos
subscription.on('message', (message) => {
  const mensaje = message.json.mensaje;
  procesarMensaje(mensaje);
  message.ack();
});