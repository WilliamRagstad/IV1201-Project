/**
 * User DTO
 */
export default class User {
	email: string;
	firstName: string;
	lastName: string;
	socialSecurityNumber: number;
	country: string;
	city?: string;
	phone?: number;
	static optionals = ["city", "phone"];

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