@echo off
start cmd /k "deno run --allow-net recruitment-app\index.ts"
FOR /F "tokens=*" %%g IN ('heroku config:get DATABASE_URL -a iv1201-recruitment') do (SET DATABASE_URL=%%g)
deno run --allow-net --allow-env --unsafely-ignore-certificate-errors recruitment-api\index.ts
