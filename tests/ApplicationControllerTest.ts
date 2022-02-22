/**
 * Connects to the API and retrieves data.
 */
Deno.test("Application Controller Fetch Attempt", async ()=>{
    await fetch(`http://localhost:8000/application`)
    .then(res => res.text())
    .then(data => JSON.parse(data))
});
