import { AppMode, Knight } from "https://deno.land/x/knight@2.1.0/mod.ts";
import DatabaseHandler from "./config/DatabaseHandler.ts";

Knight.setMode(AppMode.DEV);
const app = await Knight.build();
DatabaseHandler.getInstance().connect();

const PORT = Number.parseInt(Deno.env.get("PORT") ?? "8000");

console.log(
  AppMode[Knight.getMode()] +
    " Server ready on http://localhost:" + PORT,
);
await app.listen({ port: PORT });
DatabaseHandler.getInstance().disconnect();
