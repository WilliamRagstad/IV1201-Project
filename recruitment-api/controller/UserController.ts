import IController from "../lib/mvc-manager/IController.ts";
import { Controller, Endpoint } from "../lib/mvc-manager/Decorators.ts";
import {
  bodyMappingJSON,
  created,
  ok,
} from "../lib/mvc-manager/ControllerUtils.ts";
import { Params, StringRouterContext } from "../lib/mvc-manager/types.ts";
import User from "../model/User.ts";
import DBHandler from "../lib/database-manager/DBHandler.ts";

@Controller("/user")
export default class UserController extends IController {
  async post({ request, response }: StringRouterContext): Promise<void> {
    const user = await bodyMappingJSON(request, User);
    DBHandler.postUser(user);
    created(response, `User ${user.firstName} was successfully created`);
  }

  @Endpoint("GET", "/:id/email")
  getByEmail({ id }: Params, { response }: StringRouterContext): void {
    const email = id + "@example.com";
    ok(response, `User with email ${email} was successfully found`);
  }
}
