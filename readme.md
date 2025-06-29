# ✅ Step 1: Authenticate and Set Project

```bash
gcloud auth login
gcloud config set project <PROJECT_ID>
```

> **Example**: `gcloud config set project learn-gcp-463707`

# ✅ Step 2: Set Up Artifact Registry

```bash
// Enable
gcloud services enable artifactregistry.googleapis.com

// Create Repo
gcloud artifacts repositories create learning-gcp \
  --repository-format=docker \
  --location=asia-southeast1 \
  --description="Artifact Registry for Cloud Run practice"
```

```bash
// Build + Push Image

gcloud builds submit \
  --tag asia-southeast1-docker.pkg.dev/learn-gcp-463707/learning-gcp/learning-gcp-fe

gcloud builds submit \
  --tag asia-southeast1-docker.pkg.dev/learn-gcp-463707/learning-gcp/learning-gcp-be
```

```bash
// Deploy
gcloud run deploy learning-gcp-fe \
  --image asia-southeast1-docker.pkg.dev/learn-gcp-463707/learning-gcp/learning-gcp-fe \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --min-instances=2 \
  --max-instances=2 \
  --concurrency=1

gcloud run deploy learning-gcp-be \
  --image asia-southeast1-docker.pkg.dev/learn-gcp-463707/learning-gcp/learning-gcp-be \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --min-instances=2 \
  --max-instances=2 \
  --concurrency=1
```
