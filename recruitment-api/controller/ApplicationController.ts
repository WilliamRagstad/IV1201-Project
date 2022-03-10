import {
  Context,
  Controller,
  IController,
  ok,
} from "https://deno.land/x/knight@2.2.0/mod.ts";

import ApplicationService from "../service/ApplicationService.ts";
import LoggingService from "../service/LoggingService.ts";

/**
 * User controller class.
 */
@Controller("/application")
export default class ApplicationController extends IController {
  static applicationService = ApplicationService.instance();
  static log = LoggingService.instance().logger;

  async get({ response }: Context) {
	  response.headers.set("Access-Control-Allow-Origin", "*");
    ok(response, await ApplicationController.applicationService.getAll());
  }
}
