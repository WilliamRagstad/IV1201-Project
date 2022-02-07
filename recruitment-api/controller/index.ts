import { Router } from "https://deno.land/x/oak/mod.ts";
import ControllerManager from "../lib/mvc-manager/ControllerManager.ts";
// Controllers
import ExampleController from "./ExampleController.ts";
import UserController from "./UserController.ts";

export function registerControllers(router: Router): void {
	ControllerManager.register(router, [
		new ExampleController(),
		new UserController()
	]);
}