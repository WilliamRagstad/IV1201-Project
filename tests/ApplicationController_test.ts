import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.126.0/testing/asserts.ts";

/**
 * Connects to the API and retrieves data.
 */
Deno.test("Application Controller Fetch Attempt", async () => {
  var response = await fetch(`http://localhost:8000/application`)
    .then((res) => res.json())
    .catch((error) => {
      return {
        message: "No connection to the API, try again later.",
      };
    });
  assert(response[0].user);
  assert(response[0].availability);
  assert(response[0].competences);
});
