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

import ApplicationService from "../service/ApplicationService.ts";
import Application from "../model/Application.ts";

/**
 * User controller class.
 */
@Controller("/application")
export default class ApplicationController extends IController {
  static applicationService: ApplicationService = ApplicationService.getInstance();

  async get({ response }: Context) {
    const result:Application[] | undefined = await ApplicationController.applicationService.getAll();
    console.log(result);
    ok(response, `User with email ${result} was successfully found`);
  }
}
