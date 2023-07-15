#gcloud auth list #mostrar cuenta activa
#gcloud config list project #mostrar id proyecto
gcloud pubsub topics create bot-report #crear un topic pub/sub
gcloud services enable run.googleapis.com #habilitar cloudrun
git clone https://github.com/marc459/TelegramBotGCP-UI #descargar nuestro proyecto

# BOT SERVICE
cd TelegramBotGCP-UI/bot-service 

npm install -y express body-parser @google-cloud/pubsub #instalar dependencias

chmod u+x deploy.sh
./deploy.sh
export LAB_REPORT_SERVICE_URL=$(gcloud run  services describe lab-report-service --platform managed --region us-east1 --format="value(status.address.url)" --quiet)

chmod u+x post-reports.sh
./post-post-reports.sh

cd ../ui-service

npm install express
npm install body-parser

chmod u+x deploy.sh
./deploy.sh

gcloud iam service-accounts create pubsub-cloud-run-invoker --display-name "PubSub Cloud Run Invoker"
#gcloud run services list --platform managed
gcloud run services add-iam-policy-binding ui-service --member=serviceAccount:pubsub-cloud-run-invoker@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com --role=roles/run.invoker --region us-central1 --platform managed
PROJECT_NUMBER=$(gcloud projects list --filter="${GOOGLE_CLOUD_PROJECT}" --format='value(PROJECT_NUMBER)')
gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT --member=serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator
EMAIL_SERVICE_URL=$(gcloud run services describe ui-service --platform managed --region us-east1 --format="value(status.address.url)")
gcloud pubsub subscriptions create ui-service-sub --topic bot-report --push-endpoint=$EMAIL_SERVICE_URL --push-auth-service-account=pubsub-cloud-run-invoker@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com

./bot-service/post-reports.sh