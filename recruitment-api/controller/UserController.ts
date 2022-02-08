import { Context } from "https://deno.land/x/oak/mod.ts";
import IController from "../lib/mvc-manager/IController.ts";
import { Controller } from "../lib/mvc-manager/Decorators.ts";
import { bodyMappingJSON, created } from "../lib/mvc-manager/ControllerUtils.ts";
import User from "../model/User.ts";
// import { Controller } from "../lib/mvc-manager/Decorators.ts";

@Controller("/user")
export default class UserController extends IController {

	async post({ request, response }: Context): Promise<void> {
		const user = await bodyMappingJSON(request, User);
		// TODO: Save user to database
		created(response, `User ${user.firstName} was successfully created`);
	}

}