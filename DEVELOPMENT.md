# Further Development

## Server API

### Add new Controllers

A simple MVC controller utility framework for automatization of Controller to Endpoint connectivity.

To create a new controller, first make a new file `ExampleController.ts` in `recruitment-api/controller/`.
The code below is a template for the controller structure:

```ts
import { Context } from "https://deno.land/x/oak/mod.ts";
import { Controller } from "../lib/mvc-manager/Decorators.ts";
import IController from "../lib/mvc-manager/IController.ts";

@Controller("/example")
export default class ExampleController implements IController {

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

Lastly the controller must be registered to the webserver. do so in `recruitment-api/controller/index.ts` by adding a new instance to the `ControllerManager.register` list as shown below:

```ts
export function registerControllers(router: Router): void {
	ControllerManager.register(router, [
		new ExampleController(),
		new UserController(),
        ...
	]);
}
```

### Add new Models

Add new models to the `recruitment-api/model/` folder, following the same structure as shown in the example below:
```ts
import { Optional } from "../lib/mvc-manager/Decorators.ts";
/**
 * User DTO
 */
export default class User {
	email: string;
	firstName: string;
	lastName: string;
	socialSecurityNumber: number;
	country: string;
	@Optional()
	city?: string;
	@Optional()
	phone?: number;

	constructor(firstName: string, lastName: string, socialSecurityNumber: number, country: string, city: string, phone: number, email: string) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.socialSecurityNumber = socialSecurityNumber;
		this.country = country;
		this.city = city;
		this.phone = phone;
	}
}
```

It is important to add optional fields to the `statis optionals` array, so that the model can be validated using the `ControllerUtils.classFields` function when parsing the request body using the `ControllerUtils.bodyMappingJSON` function.





## Web App

### Add new Pages
Add new pages to the recruitment app by creating new files in the `/pages` directory.
Aleph will automatically update the web app to reflect the changes and create routes for the new pages.
`/pages/**/index.ts` is the default page for each page and subpages.
