import { getAPI } from "../lib/api.ts"; 
import { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";

/**
 * Connects to the API and retrieves data.
 */
Deno.test({
    name: "getAPI test",
    async fn(){
        const res = await getAPI('user/test/email');
        assertEquals(res.ok, true);
    },
    sanitizeOps: false,
    sanitizeResources: false,
});


