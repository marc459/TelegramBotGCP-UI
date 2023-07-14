gcloud pubsub topics create bot-report
gcloud services enable run.googleapis.com
git clone https://github.com/rosera/pet-theory.git


cd bot-service

npm install express
npm install body-parser
npm install @google-cloud/pubsub

chmod u+x deploy.sh
./deploy.sh
export LAB_REPORT_SERVICE_URL=$(gcloud run services describe lab-report-service --platform managed --region us-east1 --format="value(status.address.url)")

chmod u+x post-reports.sh
./post-post-reports.sh




cd ui-service

npm install express
npm install body-parser

chmod u+x deploy.sh
./deploy.sh

gcloud iam service-accounts create pubsub-cloud-run-invoker --display-name "PubSub Cloud Run Invoker"
#gcloud run services list --platform managed
gcloud run services add-iam-policy-binding ui-service --member=serviceAccount:pubsub-cloud-run-invoker@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com --role=roles/run.invoker --region us-central1 --platform managed
PROJECT_NUMBER=$(gcloud projects list --filter="proyect-name" --format='value(PROJECT_NUMBER)')
gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT --member=serviceAccount:service-$PROJECT_NUMBER@gcp-sa-pubsub.iam.gserviceaccount.com --role=roles/iam.serviceAccountTokenCreator
EMAIL_SERVICE_URL=$(gcloud run services describe ui-service --platform managed --region us-east1 --format="value(status.address.url)")
gcloud pubsub subscriptions create ui-service-sub --topic bot-report --push-endpoint=$EMAIL_SERVICE_URL --push-auth-service-account=pubsub-cloud-run-invoker@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com

./bot-service/post-reports.sh