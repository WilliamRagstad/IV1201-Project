import {
  bodyMappingFormData,
  Context,
  Controller,
  created,
  Endpoint,
  IController,
  ok,
  Params,
} from "https://deno.land/x/knight@2.0.3/mod.ts";

import User from "../model/User.ts";

@Controller("/user")
export default class UserController extends IController {
  async post({ request, response }: Context) {
    const user = await bodyMappingFormData(request, User);
    // TODO: Save user to database
    created(response, `User ${user.firstName} was successfully created`);
  }

  @Endpoint("GET", "/:id/email")
  getByEmail({ id }: Params, { response }: Context) {
    const email = id + "@example.com";
    ok(response, `User with email ${email} was successfully found`);
  }
}
