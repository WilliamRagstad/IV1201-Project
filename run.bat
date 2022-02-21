@echo off
SET PORT=8080
start cmd /k "aleph dev recruitment-app"
FOR /F "tokens=*" %%g IN ('heroku config:get DATABASE_URL -a iv1201-recruitment') do (SET DATABASE_URL=%%g)
SET PORT=8000
deno run --allow-net --allow-env --unsafely-ignore-certificate-errors recruitment-api\index.ts
