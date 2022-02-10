import { Context } from "https://deno.land/x/oak/mod.ts";
import {
  Controller,
  IController,
} from "https://deno.land/x/knight@2.0.1/mod.ts";

@Controller("/example")
export default class ExampleController extends IController {
  get(ctx: Context): void {
    ctx.response.body = "Hello World from ExampleController/get";
  }
  getById(id: string, ctx: Context): void {
    ctx.response.body =
      "Hello World from ExampleController/getById with ID: '" + id + "'";
  }
  post(ctx: Context): void {
    ctx.response.body = "Hello World from ExampleController/post";
  }
  delete(id: string, ctx: Context): void {
    ctx.response.body = "Hello World from ExampleController/delete with ID: '" +
      id + "'";
  }
  put(id: string, ctx: Context): void {
    ctx.response.body = "Hello World from ExampleController/put with ID: '" +
      id + "'";
  }
}
