import {
  bodyMappingFormData,
  Context,
  Controller,
  created,
  Endpoint,
  IController,
  ok,
  Params,
} from "https://deno.land/x/knight@2.1.0/mod.ts";

import User from "../model/User.ts";
import UserService from "../service/UserService.ts";

/**
 * User controller class.
 */
@Controller("/user")
export default class UserController extends IController {
  static userService: UserService = UserService.getInstance();

  async post({ request, response }: Context) {
    const user = await bodyMappingFormData(request, User);
    UserController.userService.saveUser(user);
    created(response, `User ${user.firstName} was successfully created`);
  }

  @Endpoint("GET", "/:id/email")
  getByEmail({ id }: Params, { response }: Context) {
    const email = id + "@example.com";
    ok(response, `User with email ${email} was successfully found`);
  }
}
