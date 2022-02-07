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
	city: string;
	phone?: number;

	constructor(firstName: string, lastName: string, socialSecurityNumber: number, country: string, city: string, phone: number, email: string, password: string) {
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.socialSecurityNumber = socialSecurityNumber;
		this.country = country;
		this.city = city;
		this.phone = phone;
	}
}