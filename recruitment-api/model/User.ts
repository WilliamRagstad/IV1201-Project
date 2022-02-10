import { Optional } from "https://deno.land/x/knight@2.0.1/mod.ts";

/**
 * User DTO
 */
export default class User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  socialSecurityNumber: number;
  country: string;
  @Optional()
  city?: string;
  @Optional()
  phone?: number;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    socialSecurityNumber: number,
    country: string,
    city?: string,
    phone?: number,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.socialSecurityNumber = socialSecurityNumber;
    this.country = country;
    this.password = password;
    this.city = city;
    this.phone = phone;
  }
}
