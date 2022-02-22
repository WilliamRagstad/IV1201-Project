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
    const JSONList =  result!.map(application=>convertApplicationToJSON(application));
    const JSONData = combineDuplicates(JSONList);
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
    start: [app.from_date.toLocaleDateString()],
    end: [app.to_date.toLocaleDateString()],
    competences: [[app.competence_id, app.years_of_experience]],
    email: app.email,
  }
}

/**
 * Combines duplicates with different start date, end date and competences to one single. 
 * @param JSONList A list with JSON values.
 * @returns The sorted list.
 */
function combineDuplicates(JSONList:any[]){
  var JSONData:any[] = [];

    for ( var i=0; i<JSONList.length; i++){
      //If object does not already exist in the new list, add it
      if(compareNames(JSONData, JSONList[i].name)){
          JSONData.push(JSONList[i]);
          JSONData[JSONData.length-1].competences = [];
          JSONData[JSONData.length-1].start = [];
          JSONData[JSONData.length-1].end = [];
      } else {
        //Add the competences and dates to the final object if a duplicate does not exist
          if(compareCompetences(JSONData[JSONData.length-1].competences, JSONList[i].competences))
            JSONData[JSONData.length-1].competences.push(JSONList[i].competences[0]);
          if(compareDates(JSONData[JSONData.length-1].start, JSONList[i].start))
            JSONData[JSONData.length-1].start.push(JSONList[i].start[0]);
          if(compareDates(JSONData[JSONData.length-1].end, JSONList[i].end))
            JSONData[JSONData.length-1].end.push(JSONList[i].end[0]);
      }
  }
  return JSONData;
}

/**
 * Compares the lists competences to check for duplicates
 * @param first_list The new list
 * @param second_list The old list to compare against
 * @returns True or false if duplicates exist or not
 */
function compareCompetences(first_list:any[], second_list:any[]){
  const duplicates = first_list.filter(
    function(subList:any[]) {
      return (subList[0]==second_list[0][0])
    });
  return (duplicates.length == 0 ?  true :  false);
}

/**
 * Compares the lists dates to check for duplicates
 * @param first_list The new list
 * @param second_list The old list to compare against
 * @returns True or false if duplicates exist or not
 */
function compareDates(first_list:any[], second_list:any[]){
  const duplicates = first_list.filter(
    function(date:any) {
      return (date==second_list[0])
    });
  return (duplicates.length == 0 ? true : false);
}

/**
 * Compares the list against the new name to check for duplicates
 * @param new_list The list to compare 
 * @param name The name to compare against
 * @returns True or false if duplicates exist or not
 */
function compareNames(new_list:any[], name:string){
  const duplicates = new_list.filter(function(obj) {return obj.name == name});
  return (duplicates.length == 0 ? true : false);
}