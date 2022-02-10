import { AppMode, Knight } from "https://deno.land/x/knight@2.0.1/mod.ts";
import ExampleController from "./controller/ExampleController.ts";
import UserController from "./controller/UserController.ts";

Knight.setMode(AppMode.DEV);
const app = Knight.createApi([
  new ExampleController(),
  new UserController(),
]);

console.log(
  AppMode[Knight.getMode()] +
    " Server ready on http://localhost:8000",
);
await app.listen({ port: 8000 });
