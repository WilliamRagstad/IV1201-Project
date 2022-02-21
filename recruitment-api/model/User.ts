import { Optional } from "https://deno.land/x/knight@2.0.3/mod.ts";
import Role from "./Role.ts";
import EmailPassword from "./EmailPassword.ts";

/**
 * User DTO
 */
export default class User extends EmailPassword {
  @Optional()
  id?: number;
  username: string;
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
    super(email, password);
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialSecurityNumber = socialSecurityNumber;
	  this.role = role;
  }
}
