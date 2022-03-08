import {
  Context,
  Controller,
  IController,
  ok,
} from "https://deno.land/x/knight@2.1.0/mod.ts";

import ApplicationService from "../service/ApplicationService.ts";

/**
 * User controller class.
 */
@Controller("/application")
export default class ApplicationController extends IController {
  static applicationService: ApplicationService = ApplicationService
    .getInstance();

  async get({ response }: Context) {
    ok(response, await ApplicationController.applicationService.getAll());
  }
}
