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
    var JSONList:any = [];
    result!.map((application)=>{JSONList.push(convertApplicationToJSON(application))});
    ok(response, JSONList);
  }
}

/**
 * Converts the application data to JSON.
 * @param app The Application DTO
 * @returns A JSON List
 */
function convertApplicationToJSON(app: Application){
  return {
    person_id: app.person_id,
    name: app.name+" "+app.surname,
    start: [app.from_date],
    end: [app.to_date],
    competences: [app.competence_id],
    email: app.email,
  }
}
