import {
  bodyMappingFormData,
  bodyMappingJSON,
  Context,
  Controller,
  created,
  Endpoint,
  IController,
  ok,
  Params,
  notFound,
} from "https://deno.land/x/knight@2.1.0/mod.ts";

import User from "../model/User.ts";
import UserService from "../service/UserService.ts";
import { verifyJWT, createJWT } from "../../shared/jwt.ts";



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

  @Endpoint("GET", "/verify/:token")
  async getvalidation({ token }: Params,{ response }: Context) {
    response.headers.append("Access-Control-Allow-Origin", "*");
    const res = await verifyJWT(token);
    ok(response, res);
  }

  @Endpoint("GET", "/:id/email")
  getByEmail({ id }: Params, { response }: Context) {
    const email = id + "@example.com";
    ok(response, `User with email ${email} was successfully found`);
  }

  @Endpoint("GET", "/validate/:email/:password")
  async validation({ email, password }: Params, { response }: Context) {
    const userExists = await UserController.userService.verifyUser(email, password);
    response.headers.append("Access-Control-Allow-Origin", "*");
    if(userExists==(2 || undefined)){
      ok(response, await createJWT("applicant"));
    }
    else if(userExists==1)
      ok(response, await createJWT("recruiter"));
    else
      notFound(response);
  }
}
