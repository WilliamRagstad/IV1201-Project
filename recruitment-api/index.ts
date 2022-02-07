import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { registerControllers } from "./controllers/index.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
	ctx.response.body = "Hello World from root!";
});

registerControllers(router);

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server ready on http://localhost:8000");
await app.listen({ port: 8000 });