import { Optional } from "https://deno.land/x/knight@2.0.3/mod.ts";

/**
 * User DTO
 */
export default class User {
  @Optional()
  id: number;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  socialSecurityNumber: number;

  constructor(
    id: number,
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string,
    socialSecurityNumber: number,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialSecurityNumber = socialSecurityNumber;
  }
}
