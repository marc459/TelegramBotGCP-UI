gcloud builds submit --tag gcr.io/$GOOGLE_CLOUD_PROJECT/ui-service --quiet
gcloud run deploy ui-service --image gcr.io/$GOOGLE_CLOUD_PROJECT/ui-service \
  --platform managed \
  --region us-east1 \
  --allow-unauthenticated \
  --max-instances=1 \
  --quiet
