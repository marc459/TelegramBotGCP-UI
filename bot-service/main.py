import os
from telegram.ext import Updater, CommandHandler, MessageHandler
from telegram.ext import filters
from google.cloud import pubsub_v1

# Configura las credenciales de Google Cloud para acceder a Pub/Sub
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = '/path/to/service_account_key.json'

# Configura el proyecto y el tema de Pub/Sub
project_id = 'your-project-id'
topic_id = 'your-topic-id'

# Crea un cliente de Pub/Sub
publisher = pubsub_v1.PublisherClient()

# Función para enviar un mensaje a Pub/Sub
def publish_message(message):
    topic_path = publisher.topic_path(project_id, topic_id)
    publisher.publish(topic_path, data=message.encode('utf-8'))

# Función para manejar los mensajes recibidos de Telegram
def handle_message(update, context):
    message = update.message.text
    publish_message(message)

# Función para manejar el comando /start
def start_command(update, context):
    update.message.reply_text('¡Hola! Esta es una aplicación de ejemplo que publica mensajes de Telegram en Pub/Sub.')

def main():
    # Crea un Updater de Telegram y configura los comandos y manejadores de mensajes
    updater = Updater('6301757870:AAG_QI3O97sNaW3q8jsX4YLBq_7dMrbdb4o', use_context=True)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(CommandHandler('start', start_command))
    dispatcher.add_handler(MessageHandler(filters.text & ~filters.command, handle_message))

    # Inicia el bot de Telegram
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()