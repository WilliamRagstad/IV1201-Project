import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { Hash, Salt } from "../shared/auth/password_hashing.ts";

/**
 * Tries to validate an existing user with the API.
 */
Deno.test("User Controller existing user Validate Fetch Attempt", async () => {
  const password = Hash("hunter2");
  var response = await fetch(
    `http://localhost:8000/user/validate/waxbrink@kth.se/${password}`,
  )
    .then(async (res) => await res.text());
  assert(response);
});

/**
 * Tries to validate a nonexisting user with the API.
 */
Deno.test("User Controller nonexisting user Validate Fetch Attempt", async () => {
  const password = Hash("test");
  var response = await fetch(
    `http://localhost:8000/user/validate/test@kth.se/${password}`,
  );
  await response.text()
  assertEquals(response.status, 404);
});
