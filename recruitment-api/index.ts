import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import ControllerManager from "./lib/mvc-manager/ControllerManager.ts";
import ExampleController from "./controllers/ExampleController.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
	  ctx.response.body = "Hello World from root!";
});

ControllerManager.register(router, [
	new ExampleController()
]);

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server ready on http://localhost:8000");
await app.listen({ port: 8000 });