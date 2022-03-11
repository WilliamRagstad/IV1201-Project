import { Optional } from "https://deno.land/x/knight@2.2.1/mod.ts";
import Role from "./Role.ts";

/**
 * SafeUser DTO
 */
export default class SafeUser {
  @Optional()
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  @Optional()
  role?: Role;

  constructor(
    id: number | undefined,
    email: string,
    username: string,
    firstName: string,
    lastName: string,
    role?: Role,
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
  }
}
