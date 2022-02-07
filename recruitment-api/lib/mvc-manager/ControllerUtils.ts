
import { Request } from "https://deno.land/x/oak/mod.ts";

// deno-lint-ignore no-explicit-any
type Constructor<T> = new (...args: any[]) => T;

/**
 * Extracts the body of a request as JSON and maps it to the given class.
 * @param request The request object to parse the body from
 * @param dtoType The type of the DTO to map the body to
 * @throws Error if the request body is not of the expected type (JSON) OR if the body cannot be mapped to the given DTO type
 * @returns The mapped DTO
 */
async function bodyJsonMapping<TModel>(request: Request, dtoType: Constructor<TModel>): Promise<TModel> {
	const parsed = await request.body({ type: "json" }).value;
	if (!(parsed instanceof dtoType)) throw new Error("Invalid request body, expected data transport object of type: " + dtoType.name);
	return parsed;
}

export {
	bodyJsonMapping
};