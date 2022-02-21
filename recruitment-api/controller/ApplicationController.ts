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
    const JSONData = combineData(JSONList);
    ok(response, JSONData);
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
    competences: [[app.competence_id, app.years_of_experience]],
    email: app.email,
  }
}

/**
 * Combines duplicates with different start date, end date and competences to one single. 
 * @param JSONList A list with JSON values.
 * @returns The sorted list.
 */
function combineData(JSONList:any[]){
  var JSONData:any[] = [];

    for ( var i=0; i<JSONList.length; i++){
      if(!(JSONData.filter(function(e) {return e.name == JSONList[i].name;}).length>0)){
          JSONData.push(JSONList[i]);
          JSONData[JSONData.length-1].competences = [];
          JSONData[JSONData.length-1].start = [];
          JSONData[JSONData.length-1].end = [];
      } else {
          JSONData[JSONData.length-1].competences.push(JSONList[i].competences[0]);
          if(!JSONData[JSONData.length-1].start.includes(JSONList[i].start[0]))
            JSONData[JSONData.length-1].start.push(JSONList[i].start[0]);
          if(!JSONData[JSONData.length-1].end.includes(JSONList[i].end[0]))
            JSONData[JSONData.length-1].end.push(JSONList[i].end[0]);
      }
      var compList = [];
      var checkList:number[] = [];
      for(var j = 0; j < JSONData[JSONData.length-1].competences.length; j++){
        if(!checkList.includes(JSONData[JSONData.length-1].competences[j][0])){
          checkList.push(JSONData[JSONData.length-1].competences[j][0]);
          compList.push(JSONData[JSONData.length-1].competences[j])
        }
      }
      JSONData[JSONData.length-1].competences = compList;
  }
  return JSONData;
}