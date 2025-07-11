#!/bin/bash
for i in {1..10}; do
  curl https://learning-gcp-fe-214622881647.asia-southeast1.run.app &
done
wait