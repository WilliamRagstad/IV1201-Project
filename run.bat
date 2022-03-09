@echo off
start cmd /k "aleph dev recruitment-app"
FOR /F "tokens=*" %%g IN ('heroku config:get DATABASE_URL -a iv1201-recruitment') do (SET DATABASE_URL=%%g)
deno run -A --unsafely-ignore-certificate-errors --unstable recruitment-api\index.ts
