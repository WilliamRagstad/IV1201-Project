import {
  assert,
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.126.0/testing/asserts.ts";
import { getAPI } from "../../recruitment-app/lib/api.ts";
/**
 * Connects to the API and retrieves data.
 */
Deno.test({
  name: "Application Endpoint GET test",
  async fn(){
      const res = await getAPI('application');
      const data = await res.json();
      assert(data[0].user);
      assert(data[0].availability);
      assert(data[0].competences);
  },
  sanitizeOps: false,
  sanitizeResources: false,
});