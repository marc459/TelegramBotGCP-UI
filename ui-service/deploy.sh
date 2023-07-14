gcloud builds submit \
  --tag gcr.io/$GOOGLE_CLOUD_PROJECT/ui-service
gcloud run deploy ui-service \
  --image gcr.io/$GOOGLE_CLOUD_PROJECT/ui-service \
  --platform managed \
  --region us-east1 \
  --no-allow-unauthenticated \
  --max-instances=1