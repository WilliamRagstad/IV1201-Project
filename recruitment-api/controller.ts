import { v4 } from "https://deno.land/std/uuid/mod.ts";

import User from "./model/user.ts";

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
        let newUser: User = {
            firstname: body.value.firstname,
            lastname: body.value.lastname,
            personnumber: body.value.personnumber,
            country: body.value.country,
            city: body.value.city,
            phone: body.value.phone,
            email: body.value.email,
            password: body.value.password,
        }
        let data = newUser;
        response.body = {
            success: true,
            data,
        };
    }
}