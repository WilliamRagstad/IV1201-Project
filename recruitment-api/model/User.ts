import { Optional } from "../lib/mvc-manager/Decorators.ts";

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

	constructor(firstName: string, lastName: string, socialSecurityNumber: number, country: string, password: string, city?: string, phone?: number, email: string) {
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
