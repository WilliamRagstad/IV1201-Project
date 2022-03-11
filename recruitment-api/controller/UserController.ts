import {
  badRequest,
  bodyMappingForm,
  Context,
  Controller,
  created,
  Endpoint,
  IController,
  notFound,
  ok,
  Params,
} from "https://deno.land/x/knight@2.2.1/mod.ts";

import User from "../model/User.ts";
import SafeUser from "../model/SafeUser.ts";
import UserService from "../service/UserService.ts";
import LoggingService from "../service/LoggingService.ts";
import Role from "../model/Role.ts";
import { createJWT } from "../../shared/auth/jwt.ts";
import ValidationService from "../service/ValidationService.ts";

/**
 * User controller class.
 */
@Controller("/user")
export default class UserController extends IController {
  private userService = UserService.instance();
  private validationService = ValidationService.instance();
  private log = LoggingService.instance().logger;

  async post({ request, response }: Context) {
    this.log.debug("Request to: POST /user");
    response.headers.append("Access-Control-Allow-Origin", "*");
    const user = await bodyMappingForm(request, User);
    this.validationService.validate(user, {
      firstName: { type: "string", required: true },
      lastName: { type: "string", required: true },
      username: { type: "string", required: true },
      socialSecurityNumber: { type: "number", required: true },
      email: { type: "string", required: true },
      password: { type: "string", required: true },
    });
    if (await this.userService.saveUser(user)) {
      created(
        response,
        await createJWT(
          new SafeUser(
            undefined,
            user.email,
            user.username,
            user.firstName,
            user.lastName,
            new Role(2, "applicant"),
          ),
        ),
      );
      this.log.success(
        `Successfully created user ${user.firstName} with email ${user.email}`,
      );
    } else {
      badRequest(response, `User ${user.firstName} could not be created.`);
      this.log.warn(
        `Failed to create user ${user.firstName} with email ${user.email}`,
      );
    }
  }

  @Endpoint("GET", "/:id/email")
  getByEmail({ id }: Params, { response }: Context) {
    this.log.debug("Request to: GET /user/:id/email");
    const email = id + "@example.com";
    ok(response, `User with email ${email} was successfully found`);
    this.log.success(`Successfully found user with email ${email}`);
  }

  //TODO: Change to POST request
  @Endpoint("GET", "/validate/:email/:password")
  async validation({ email, password }: Params, { response }: Context) {
    this.log.debug("Request to: GET /user/validate/ by " + email);
    const verifiedUser = await this.userService.verifyUser(
      email,
      password,
    );
    response.headers.append("Access-Control-Allow-Origin", "*");
    if (verifiedUser) {
      // We want to remove sensitive information before sending the user back to the client
      ok(
        response,
        await createJWT(
          new SafeUser(
            verifiedUser.id,
            verifiedUser.email,
            verifiedUser.username,
            verifiedUser.firstName,
            verifiedUser.lastName,
            verifiedUser.role,
          ),
        ),
      );
      this.log.success(
        `Successfully validated user ${email} and created JWT session`,
      );
    } else {
      notFound(response);
      this.log.warn(`Failed to validate user ${email}`);
    }
  }

  //TODO: Change to POST request
  @Endpoint("GET", "/password/:email/:password")
  async setPassword({ email, password }: Params, { response }: Context){
    this.log.debug("Request to: GET /user/password/ by " + email);
    response.headers.append("Access-Control-Allow-Origin", "*");
    if (await UserController.userService.updatePassword(email, password)) {
      ok(response, `Successfully updated password for user ${email}`);
      this.log.success(`Successfully updated password for user ${email}`);
    } else {
      notFound(response);
      this.log.warn(`Failed to update password for user ${email}`);
    }
  }
}
