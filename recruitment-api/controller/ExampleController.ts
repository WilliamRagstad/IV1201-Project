import { Context } from "https://deno.land/x/oak/mod.ts";
import IController from "../lib/mvc-manager/IController.ts";

export default class ExampleController implements IController {
	path = "/example";

	get(ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/get";
	}
	getById(id: string, ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/getById with ID: '" + id + "'";
	}
	post(ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/post";
	}
	delete(id: string, ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/delete with ID: '" + id + "'";
	}
	put(id: string, ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/put with ID: '" + id + "'";
	}

}