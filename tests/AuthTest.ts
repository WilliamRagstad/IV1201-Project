import { Salt, Hash } from "../shared/auth/password_hashing.ts"; 
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";

/**
 * Connects to the API and retrieves data.
 */
Deno.test("Hashing Algorithm",  ()=>{
    const first_password = Hash(Salt+"examplepassword123");
    const second_password = Hash(Salt+"examplepassword123");
    const wrong_password = Hash(Salt+"examplepassword1234");

    assertEquals(first_password, second_password);
    assertNotEquals(first_password, wrong_password);
});

