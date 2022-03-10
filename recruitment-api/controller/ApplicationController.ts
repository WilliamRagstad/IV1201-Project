import {
  Context,
  Controller,
  IController,
  ok,
} from "https://deno.land/x/knight@2.2.1/mod.ts";

import ApplicationService from "../service/ApplicationService.ts";
import LoggingService from "../service/LoggingService.ts";

/**
 * User controller class.
 */
@Controller("/application")
export default class ApplicationController extends IController {
  static applicationService = ApplicationService.instance();
  private log = LoggingService.instance().logger;

  async get({ response }: Context) {
    this.log.debug("Request to: GET /application");
    const applications = await ApplicationController.applicationService.getAll();
    if (applications) {
      this.log.success(`Successfully retrieved ${applications.length} applications`);
    } else {
      this.log.error("Failed to retrieve applications");
    }
    response.headers.set("Access-Control-Allow-Origin", "*");
    ok(response, applications);
  }
}
