import { AppMode, Knight } from "https://deno.land/x/knight@2.0.3/mod.ts";
import DatabaseHandler from "./config/DatabaseHandler.ts";
import ExampleController from "./controller/ExampleController.ts";
import UserController from "./controller/UserController.ts";

Knight.setMode(AppMode.DEV);
const app = Knight.createApi([
  new ExampleController(),
  new UserController(),
]);
DatabaseHandler.getInstance().connect();

const PORT = Number.parseInt(Deno.env.get("PORT") ?? "8000");

console.log(
  AppMode[Knight.getMode()] +
    " Server ready on http://localhost:" + PORT,
);
await app.listen({ port: PORT });
DatabaseHandler.getInstance().disconnect();
