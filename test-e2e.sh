#!/bin/bash

docker compose -f compose-e2e.yaml up \
  --build \
  --renew-anon-volumes \
  --force-recreate \
  --abort-on-container-exit \
  --exit-code-from backend \
  --attach backend
