import { assertEquals, assertNotEquals, assert } from "https://deno.land/std@0.126.0/testing/asserts.ts";

/**
 * Connects to the API and retrieves data.
 */
Deno.test("Application Controller Fetch Attempt", async ()=>{
    var response:any;
    await fetch(`http://localhost:8000/application`)
    .then(res => res.text())
    .then(data => response = JSON.parse(data)[0])
    console.log(response);
    assert(response.person_id)
    assert(response.name)
    assert(response.start)
    assert(response.end)
    assert(response.competences)
    assert(response.email)
});
