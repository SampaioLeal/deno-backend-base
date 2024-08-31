#!/bin/bash

export DATABASE_URL="postgresql://deno:postgres@127.0.0.1:5432/deno"

docker compose -f compose-e2e.yaml up -d
deno task db:migrate
deno task test:e2e
docker compose -f compose-e2e.yaml down