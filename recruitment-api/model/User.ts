import { Optional } from "https://deno.land/x/knight@2.0.3/mod.ts";
import Role from "./Role.ts";

/**
 * User DTO
 */
export default class User {
  @Optional()
  id?: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  socialSecurityNumber: number;
  @Optional()
  role?: Role;

  constructor(
    id: number | undefined,
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string,
    socialSecurityNumber: number,
	  role?: Role,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialSecurityNumber = socialSecurityNumber;
	  this.role = role;
  }
}
