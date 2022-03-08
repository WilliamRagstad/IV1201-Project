// Possible API base URLs:
//? Important: The base urls must no contain a trailing slash
const baseURLs = [
  "http://localhost:8000",
  "https://iv1201-recruitment-api.herokuapp.com",
];

/**
 * Fetch data from the local or public API.
 * @param endpoint Name of the endpoint without the base url. Must not contain a leading slash!
 */
export async function getAPI(endpoint: string) {
  const results = await Promise.allSettled(
    //? Remove first slash from endpoint
    baseURLs.map((b) => fetch(`${b}/${endpoint}`)),
  );
  return (results.find((result) => result.status === "fulfilled") as
    | PromiseFulfilledResult<Response>
    | undefined)?.value ??
    new Response(new Blob(), {
      status: 404,
      statusText: "Request failed, endpoint not found",
    });
}
