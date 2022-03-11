import { hashPassword } from "../lib/passhash.ts"; 
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";

/**
 * Connects to the API and retrieves data.
 */
Deno.test({
    name: "Hashing Algorithm test", 
    fn(){
        const first_password = hashPassword("examplepassword123");
        const second_password = hashPassword("examplepassword123");
        const wrong_password = hashPassword("examplepassword1234");
    
        assertEquals(first_password, second_password);
        assertNotEquals(first_password, wrong_password);
    }
})