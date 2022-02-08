import { AppMode, ControllerManager } from "./lib/mvc-manager/ControllerManager.ts";
import ExampleController from "./controller/ExampleController.ts";
import UserController from "./controller/UserController.ts";

ControllerManager.setMode(AppMode.DEV);
const app = ControllerManager.createApi([
	new ExampleController(),
	new UserController()
]);

console.log(AppMode[ControllerManager.getMode()] + " Server ready on http://localhost:8000");
await app.listen({ port: 8000 });