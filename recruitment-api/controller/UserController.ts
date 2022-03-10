import {
  bodyMappingFormData,
  Context,
  Controller,
  created,
  Endpoint,
  IController,
  ok,
  Params,
  notFound,
  badRequest
} from "https://deno.land/x/knight@2.2.0/mod.ts";

import User from "../model/User.ts";
import UserService from "../service/UserService.ts";
import LoggingService from "../service/LoggingService.ts";
import { createJWT } from "../../shared/auth/jwt.ts";

/**
 * User controller class.
 */
@Controller("/user")
export default class UserController extends IController {
  static userService = UserService.instance();
  static log = LoggingService.instance().logger;

  async post({ request, response }: Context) {
    const user = await bodyMappingFormData(request, User);
    if (await UserController.userService.saveUser(user)) {
		created(response, `User ${user.firstName} was successfully created!`);
	} else {
		badRequest(response, `User ${user.firstName} could not be created.`);
	}
  }

  @Endpoint("GET", "/:id/email")
  getByEmail({ id }: Params, { response }: Context) {
    const email = id + "@example.com";
    ok(response, `User with email ${email} was successfully found`);
  }

  //TODO: Change to POST request
  @Endpoint("GET", "/validate/:email/:password")
  async validation({ email, password }: Params, { response }: Context) {
    const verifiedUser = await UserController.userService.verifyUser(email, password);
    response.headers.append("Access-Control-Allow-Origin", "*");
    if(verifiedUser) {
      // We want to remove sensitive information before sending the user back to the client
      const strippedUser = {
        id: verifiedUser.id,
        firstName: verifiedUser.firstName,
        lastName: verifiedUser.lastName,
        username: verifiedUser.username,
        email: verifiedUser.email,
        role: verifiedUser.role,
      }
      ok(response, await createJWT(strippedUser));
    }
    else
      notFound(response);
  }
}
