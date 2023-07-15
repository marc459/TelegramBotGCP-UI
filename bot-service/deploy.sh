gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/bot-service --quiet
gcloud run deploy bot-service \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/bot-service \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated \
  --max-instances=1 \
  --quiet