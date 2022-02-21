import { Aleph, Server } from 'https://deno.land/x/aleph/server/mod.ts'
import { parse } from 'https://deno.land/std/flags/mod.ts';

const PORT = Number.parseInt(parse(Deno.args).port ?? Deno.env.get("PORT") ?? "8080");

const aleph = new Aleph(Deno.cwd(), "development")
const server = new Server(aleph)
const listener = Deno.listen({ port: PORT })

console.log('Web server ready on http://localhost:' + PORT)
for await (const conn of listener) {(async () => {
    const httpConn = Deno.serveHttp(conn)
    for await (const e of httpConn) {
      server.handle(e)
    }
})()}
