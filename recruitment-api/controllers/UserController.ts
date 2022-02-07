import { Context } from "https://deno.land/x/oak/mod.ts";
import IController from "../lib/mvc-manager/IController.ts";

export default class UserController implements IController {
	path = "/user";

	post(ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/post";
	}

}