// Possible API base URLs:
//? Important: The base urls must no contain a trailing slash
const baseURLs = [
  "http://localhost:8000",
  "https://iv1201-recruitment-api.herokuapp.com",
];

const emptyResponse = new Response(new Blob(), {
  status: 404,
  statusText: "Request failed, endpoint not found",
});

// Ref: https://stackoverflow.com/questions/39940152/get-first-fulfilled-promise
const invert = <T>(p: Promise<T>) =>
  new Promise<T>((res, rej) => p.then(rej, res));
const firstOf = <T>(ps: Promise<T>[]): Promise<T> | Promise<string[]> =>
  invert(Promise.all(ps.map(invert))) as any;

/**
 * Fetch data from the local or public API.
 * @param endpoint Name of the endpoint without the base url. Must not contain a leading slash!
 * @param options Optional settings that you want to apply to the request.
 * @returns The response from the server.
 */
export async function getAPI(endpoint: string, options: any = []) {
  let results;
  try {
    results = await firstOf(
      baseURLs.map(async (b) => await fetch(`${b}/${endpoint}`, options)),
    );
  } catch { /* Ignore failed requests */ }
  if (Array.isArray(results)) {
    console.error(results);
    return emptyResponse;
  }
  return results ?? emptyResponse;
}
