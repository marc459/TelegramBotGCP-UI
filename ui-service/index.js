const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// //const port=8080;
// const port = process.env.PORT || 8080;
// //const { PubSub } = require('@google-cloud/pubsub');

// //const projectId = 'telegramgcpdev';
// //const subscriptionName = 'ui-service-sub';

// //const pubsub = new PubSub({ projectId });
// //const subscription = pubsub.subscription(subscriptionName);



// //var msg ="";
// app.get('/', async (req, res) => {
//   res.send("Api front");
// })

// // Escucha los mensajes recibidos
// /*subscription.on('message', (message) => {
//   const mensaje = message.json.mensaje;
//   //msg = mensaje;
// message.ack();
// });*/

// app.post('/', async (req, res) => {
//   const labReport = decodeBase64Json(req.body.message.data);
//   try {
//     console.log(`Email Service: Report ${labReport.id} trying...`);
//     //sendEmail();
//     console.log(`Email Service: Report ${labReport.id} success :-)`);
//     res.status(204).send();
//   }
//   catch (ex) {
//     console.log(`Email Service: Report ${labReport.id} failure: ${ex}`);
//     res.status(500).send();
//   }
// })
// function decodeBase64Json(data) {
//   return JSON.parse(Buffer.from(data, 'base64').toString());
// }
// function sendEmail() {
//   console.log('Sending email');
// }
// app.listen(port, () => {
//   console.log('Listening on port', port);
// });

// const app = require('./app.js');
const PORT = parseInt(parseInt(process.env.PORT)) || 8080;

app.get('/', async (req, res) => {
  res.send("Api front");
})

app.listen(PORT, () =>
  console.log(`nodejs-pubsub-tutorial listening on port ${PORT}`)
);