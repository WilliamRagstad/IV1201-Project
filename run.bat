@echo off
start cmd /k "deno run -A https://deno.land/x/aleph@v0.3.0-beta.19/cli.ts dev recruitment-app -p 8080"
FOR /F "tokens=*" %%g IN ('heroku config:get DATABASE_URL -a iv1201-recruitment') do (SET DATABASE_URL=%%g)
deno run --allow-net --allow-env --unsafely-ignore-certificate-errors recruitment-api\index.ts
