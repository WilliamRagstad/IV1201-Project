import { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";
import User from "../recruitment-api/model/User.ts";
import UserService from "../recruitment-api/service/UserService.ts";

/**
 * Connects to the API and retrieves data.
 */
/*Deno.test("User Controller Email Fetch Attempt", async ()=>{
    const user:User = new User(3000, "test@kth.se", "password123", "testaccount", "test", "testsson", 199912129999, undefined);

    userService.saveUser(user);
    
});
*/