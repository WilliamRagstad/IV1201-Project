import { v4 } from "https://deno.land/std/uuid/mod.ts";

import  FullUser  from './model/user.ts';

export default {
    createUser: async (
        { request, response }: { request: any; response: any },
      ) => {
        console.log("request receieved")
        const body = await request.body();
        if (!request.hasBody) {
          response.status = 400;
          response.body = {
            success: false,
            message: "No data provided",
          };
          return;
        }
        if(body){
        let newUser = new FullUser (
            body.value.firstname,
            body.value.lastname,
            body.value.personnumber,
            body.value.country,
            body.value.city,
            body.value.phone,
            body.value.email,
            body.value.password,
        )
        newUser.printName();
        let data = newUser;
        
        response.body = {
            success: true,
            data,
        };
      }
    }
}