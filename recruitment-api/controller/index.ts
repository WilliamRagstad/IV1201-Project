import { Router } from "https://deno.land/x/oak/mod.ts";
import { ControllerManager, AppMode } from "../lib/mvc-manager/ControllerManager.ts";
// Controllers
import ExampleController from "./ExampleController.ts";
import UserController from "./UserController.ts";

ControllerManager.setMode(AppMode.DEV);
export function registerControllers(router: Router): void {
	ControllerManager.register(router, [
		new ExampleController(),
		new UserController()
	]);
}