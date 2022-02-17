import { AppMode, Knight } from "https://deno.land/x/knight@2.0.3/mod.ts";
import DatabaseHandler from "./config/DatabaseHandler.ts";
import ExampleController from "./controller/ExampleController.ts";
import UserController from "./controller/UserController.ts";
import ApplicationController from "./controller/ApplicationController.ts";

Knight.setMode(AppMode.DEV);
const app = Knight.createApi([
  new ExampleController(),
  new UserController(),
  new ApplicationController(),
]);
DatabaseHandler.getInstance().connect();

console.log(
  AppMode[Knight.getMode()] +
    " Server ready on http://localhost:8000",
);
await app.listen({ port: 8000 });
DatabaseHandler.getInstance().disconnect();
