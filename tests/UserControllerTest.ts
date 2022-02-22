/**
 * Connects to the API and retrieves data.
 */
Deno.test("User Controller Email Fetch Attempt", async ()=>{
    var response:any;
    await fetch(`http://localhost:8000/user/test/email`)
    .then(res => res.text())
    .then(data => response = data);
    console.log(response);
});
