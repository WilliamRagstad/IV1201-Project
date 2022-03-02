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
import EmailPassword from "../model/EmailPassword.ts";
import UserService from "../service/UserService.ts";
import { create, verify, Payload, Header, getNumericDate } from "https://deno.land/x/djwt@v2.4/mod.ts";


const encoder = new TextEncoder()
var keyBuf = encoder.encode("mySuperSecret");

var key = await crypto.subtle.importKey(
  "raw",
  keyBuf,
  {name: "HMAC", hash: "SHA-256"},
  true,
  ["sign", "verify"],
)

let payloader = (title:string) => {
  let payload:Payload = {
    iss: title,
    exp: getNumericDate(60*60)
  }
  return payload
}
const algorithm = "HS256"

const header: Header = {
  alg: algorithm,
  typ: "JWT",
};
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
    ok(response, await verify(token, key));
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
      ok(response, await create(header, payloader("applicant"), key));
    }
    else if(userExists==1)
      ok(response, await create(header, payloader("recruiter"), key));
    else
      notFound(response);
  }

}
