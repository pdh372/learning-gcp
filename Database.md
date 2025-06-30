# ✅ Step 1: Set Up SQL

```bash
gcloud services enable sqladmin.googleapis.com
```

# ✅ Step 2: Set Up DB

```bash
# 1. Primary: write
gcloud sql instances create learn-sql-primary ...

# 2. Replica: read-only
gcloud sql instances create learn-sql-replica ...

# check
gcloud sql instances describe $NAME
```

```bash
# Remove authenticate
gcloud sql instances patch $NAME \
  --authorized-networks="$(curl ifconfig.me)"

# If you forgot you password
gcloud sql users set-password $NAME \
  --instance=yuh \
  --password="your-new-password"

mysql -u root -p -h $PUBLIC_IP -P 3306

GRANT ALL PRIVILEGES ON *.* TO 'yuh'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

*.* → full database
'%' → any ip
WITH GRANT OPTION -> Give PRIVILEGES for others
```

```bash
# Create DB
gcloud sql databases create learning_gcp --instance=yuh
```
