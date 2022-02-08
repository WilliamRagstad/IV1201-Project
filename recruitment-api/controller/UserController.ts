import { Context } from "https://deno.land/x/oak/mod.ts";
import IController from "../lib/mvc-manager/IController.ts";
import { bodyMappingJSON, created } from "../lib/mvc-manager/ControllerUtils.ts";
import User from "../model/User.ts";

export default class UserController implements IController {
	path = "/user";

	async post({ request, response }: Context): Promise<void> {
		const user = await bodyMappingJSON(request, User);
		// TODO: Save user to database
		created(response, `User ${user.firstName} was successfully created`);
	}

}