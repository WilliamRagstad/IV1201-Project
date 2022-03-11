import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { getAPI } from "../../recruitment-app/lib/api.ts";

/**
 * Tries to validate an existing user with the API.
 */
Deno.test({
  name: "UserController Endpoint GET Validate test",
  async fn(){
    const res = await getAPI(`user/validate/waxbrink@kth.se/f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7`);
    assert(res.ok);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

/**
 * Tries to validate a nonexisting user with the API.
 */
Deno.test({
  name: "UserController Endpoint GET Wrong Validate test",
  async fn(){
    const res = await getAPI(`user/validate/waxbrink@kth.se/f152fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7`);
    assertEquals(res.status, 404);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});