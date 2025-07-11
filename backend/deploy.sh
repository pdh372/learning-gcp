#!/bin/bash

gcloud builds submit \
  --tag asia-southeast1-docker.pkg.dev/learn-gcp-463707/learning-gcp/learning-gcp-be

gcloud run deploy learning-gcp-be \
  --image asia-southeast1-docker.pkg.dev/learn-gcp-463707/learning-gcp/learning-gcp-be \
  --region asia-southeast1 \
  --platform managed \
  --allow-unauthenticated \
  --min-instances=2 \
  --max-instances=2 \
  --concurrency=1 \
  --env-vars-file env.yaml
