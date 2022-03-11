import { assertEquals, assertNotEquals } from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { deleteAllCookies } from "../lib/cookies.ts";

const expiredCookie = "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

/**
 * Connects to the API and retrieves data.
 */
Deno.test({
    name: "deleteAllCookies test",
    fn(){
		window.document = {} as any;
        window.document.cookie ="name=test;"
        deleteAllCookies();
        assertEquals(window.document.cookie, expiredCookie);
    }
});
