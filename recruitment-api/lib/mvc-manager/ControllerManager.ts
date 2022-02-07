import IController from "./IController.ts";

import { Router, RouteParams, State, RouterMiddleware, RouterContext } from "https://deno.land/x/oak/mod.ts";

export enum AppMode {
	DEV,
	PROD
}
export class ControllerManager {

	private static _mode = AppMode.DEV;

	public static setMode(mode: AppMode) { this._mode = mode; }

	private static endpointHandler<
		R extends string,
		P extends RouteParams<R> = RouteParams<R>,
		// deno-lint-ignore no-explicit-any
		S extends State = Record<string, any>
	>(handler: RouterMiddleware<R, P, S>) {
		if (this._mode === AppMode.DEV) {
			// Return exception stack trace in development mode
			return async (ctx: RouterContext<R, P, S>, next: () => Promise<unknown>): Promise<void> => {
				try {
					await handler(ctx, next);
				} catch (error) {
					ctx.response.status = 500;
					ctx.response.body = {
						status: 500,
						message: error.message
					};
				}
			}
		} else {
			// Return internal server error in production mode
			return async (ctx: RouterContext<R, P, S>, next: () => Promise<unknown>): Promise<unknown> => await handler(ctx, next);
		}
	}

	/**
	 * Register a list of controllers
	 */
	public static register(router: Router, controllers: IController[]) {
		for (const controller of controllers) {
			controller.get && router["get"](controller.path, this.endpointHandler(controller.get));
			controller.getById && router["get"](`${controller.path}/:id`, this.endpointHandler((ctx) => controller.getById && controller.getById(ctx.params.id, ctx)));
			controller.post && router["post"](controller.path, this.endpointHandler(controller.post));
			controller.delete && router["delete"](`${controller.path}/:id`, this.endpointHandler((ctx) => controller.delete && controller.delete(ctx.params.id, ctx)));
			controller.put && router["put"](`${controller.path}/:id`, this.endpointHandler((ctx) => controller.put && controller.put(ctx.params.id, ctx)));
		}
	}

}