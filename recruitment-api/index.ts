import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import controller from "./controller.ts";

const app = new Application();

/*app.use((ctx) => {
  ctx.response.body = "Hello World!";
});*/



const router = new Router();
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});

router.post("/newuser", controller.createUser)

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server ready on http://localhost:8000");
await app.listen({ port: 8000 });
