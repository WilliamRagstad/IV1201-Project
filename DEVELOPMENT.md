# Further Development

## Server API

### Add new Controllers

A simple MVC controller utility framework for automatization of Controller to Endpoint connectivity.

To create a new controller, first make a new file `ExampleController.ts` in `recruitment-api/controllers/`.
The code below is a template for the controller structure:

```ts
import { Context } from "https://deno.land/x/oak/mod.ts";
import IController from "../lib/mvc-manager/IController.ts";

export default class ExampleController implements IController {
	path = "/example";

	get(ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/get";
	}
	getById(id: string, ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/getById with ID: '" + id + "'";
	}
	post(ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/post";
	}
	delete(id: string, ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/delete with ID: '" + id + "'";
	}
	put(id: string, ctx: Context): void {
		ctx.response.body = "Hello World from ExampleController/put with ID: '" + id + "'";
	}

}
```

Lastly the controller must be registered to the webserver. do so in `recruitment-api/controllers/index.ts` by adding a new instance to the `ControllerManager.register` list as shown below:

```ts
export function registerControllers(router: Router): void {
	ControllerManager.register(router, [
		new ExampleController(),
		new UserController(),
        ...
	]);
}
```

## Web App

### Add new Pages
Add new pages to the recruitment app by creating new files in the `/pages` directory.
Aleph will automatically update the web app to reflect the changes and create routes for the new pages.
`/pages/**/index.ts` is the default page for each page and subpages.
