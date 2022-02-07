import IController from "./IController.ts";

import { Router } from "https://deno.land/x/oak/mod.ts";


export default class ControllerManager {

	/**
	 * Register a list of controllers
	 */
	public static register(router: Router, controllers: IController[]) {
		for (const controller of controllers) {
			controller.get && router["get"](controller.path, controller.get);
			controller.getById && router["get"](`${controller.path}/:id`, (ctx) => controller.getById && controller.getById(ctx.params.id, ctx));
			controller.post && router["post"](controller.path, controller.post);
			controller.delete && router["delete"](`${controller.path}/:id`, (ctx) => controller.delete && controller.delete(ctx.params.id, ctx));
			controller.put && router["put"](`${controller.path}/:id`, (ctx) => controller.put && controller.put(ctx.params.id, ctx));
		}
	}

}